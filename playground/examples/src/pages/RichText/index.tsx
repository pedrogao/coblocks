import { useCallback, useEffect, useMemo, useState } from "react";
import { createEditor, Editor, Transforms, Element as SlateElement, Descendant } from "slate";
import { Editable, Slate, withReact, useSlate } from "slate-react";
import { withYjs, YjsEditor, withYHistory } from "@slate-yjs/core";
import isHotkey from "is-hotkey";
import * as Y from "yjs";
import { Button, Icon, Toolbar } from "../../components/Button";
import Network from "../../components/Network";
import { useHocuspocusProvider, HocuspocusContextProvider } from "../../provider";

export default function Page() {
  return (
    <HocuspocusContextProvider>
      <Network />
      <RichTextExample />
    </HocuspocusContextProvider>
  );
}

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const initialValue: Descendant[] = [];

const RichTextExample = () => {
  const provider = useHocuspocusProvider();

  const editor = useMemo(() => {
    const sharedType = provider.document.get("richtext", Y.XmlText) as Y.XmlText;
    const e = withReact(withYHistory(withYjs(createEditor(), sharedType)));
    // Ensure editor always has at least 1 valid child
    const { normalizeNode } = e;
    e.normalizeNode = (entry) => {
      const [node] = entry;
      if (!Editor.isEditor(node) || node.children.length > 0) {
        return normalizeNode(entry);
      }

      Transforms.insertNodes(
        editor,
        {
          // @ts-expect-error type is not compatible
          type: "paragraph",
          children: [{ text: "" }],
        },
        { at: [0] }
      );
    };
    return e;
  }, [provider.document]);

  const [value, setValue] = useState<Descendant[]>(initialValue);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  useEffect(() => {
    YjsEditor.connect(editor);
    return () => YjsEditor.disconnect(editor);
  }, [editor]);

  return (
    <Slate editor={editor} initialValue={value} onChange={setValue}>
      <Toolbar>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        style={{
          minHeight: "300px",
          border: "1px solid #ccc",
        }}
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            /* eslint-disable  @typescript-eslint/no-explicit-any */
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              // @ts-expect-error type is not compatible
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
};

// @ts-expect-error type is not compatible
const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      // @ts-expect-error type is not compatible
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      // @ts-expect-error type is not compatible
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      // @ts-expect-error type is not compatible
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

// @ts-expect-error type is not compatible
const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

// @ts-expect-error type is not compatible
const isBlockActive = (editor, format, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      // @ts-expect-error type is not compatible
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n[blockType] === format,
    })
  );

  return !!match;
};

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  // @ts-expect-error type is not compatible
  return marks ? marks[format] === true : false;
};

// @ts-expect-error type is not compatible
const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

// @ts-expect-error type is not compatible
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

// @ts-expect-error type is not compatible
const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? "align" : "type")}
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      onMouseDown={(event: any) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

// @ts-expect-error type is not compatible
const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      onMouseDown={(event: any) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};
