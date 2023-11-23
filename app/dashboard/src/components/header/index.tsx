import {
  Avatar,
  Box,
  BoxProps,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from "@refinedev/chakra-ui";
import { useGetIdentity, useGetLocale, useSetLocale } from "@refinedev/core";
import { IconLanguage, IconMoon, IconSun } from "@tabler/icons-react";
import i18n from "i18next";
import React from "react";

type IUser = {
  id: number;
  username: string;
  role: number;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({ sticky }) => {
  const { data: user } = useGetIdentity<IUser>();

  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue("refine.header.bg.light", "refine.header.bg.dark");

  const changeLanguage = useSetLocale();
  const locale = useGetLocale();
  const currentLocale = locale();

  let stickyProps: BoxProps = {};
  if (sticky) {
    stickyProps = {
      position: "sticky",
      top: 0,
      zIndex: 1,
    };
  }

  const getLanguageTitle = (lang: string) => {
    switch (lang) {
      case "en":
        return "English";
      case "zh-CN":
        return "中文简体";
      default:
        return "Unknown";
    }
  };

  return (
    <Box
      py="2"
      pr="4"
      pl="2"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      height="64px"
      bg={bgColor}
      borderBottom="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      {...stickyProps}
    >
      <HamburgerMenu />

      <HStack>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<IconLanguage />}
            variant="ghost"
          />
          <MenuList>
            {[...(i18n.languages ?? [])].sort().map((lang: string) => (
              <MenuItem
                key={lang}
                onClick={() => {
                  changeLanguage(lang);
                }}
                value={lang}
                color={lang === currentLocale ? "green" : undefined}
                icon={<Avatar src={`/images/flags/${lang}.svg`} h={18} w={18} />}
              >
                {getLanguageTitle(lang)}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <IconButton variant="ghost" aria-label="Toggle theme" onClick={toggleColorMode}>
          <Icon as={colorMode === "light" ? IconMoon : IconSun} w="24px" h="24px" />
        </IconButton>

        {user?.username && (
          <HStack>
            {user?.username && (
              <Text size="sm" fontWeight="bold">
                {user.username}
              </Text>
            )}
            <Avatar size="sm" name={user?.username} />
          </HStack>
        )}
      </HStack>
    </Box>
  );
};
