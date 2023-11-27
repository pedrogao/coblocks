import {
  Extension,
  onChangePayload,
  onConfigurePayload,
  onConnectPayload,
  onLoadDocumentPayload,
  onDestroyPayload,
  onDisconnectPayload,
  onRequestPayload,
  onUpgradePayload,
} from '@hocuspocus/server';
import { Logger as CommonLogger } from '@nestjs/common';

export interface LoggerConfiguration {
  /**
   * Whether to log something for the `onLoadDocument` hook.
   */
  onLoadDocument: boolean;
  /**
   * Whether to log something for the `onChange` hook.
   */
  onChange: boolean;
  /**
   * Whether to log something for the `onStoreDocument` hook.
   */
  onStoreDocument: boolean;
  /**
   * Whether to log something for the `onConnect` hook.
   */
  onConnect: boolean;
  /**
   * Whether to log something for the `onDisconnect` hook.
   */
  onDisconnect: boolean;
  /**
   * Whether to log something for the `onUpgrade` hook.
   */
  onUpgrade: boolean;
  /**
   * Whether to log something for the `onRequest` hook.
   */
  onRequest: boolean;
  /**
   * Whether to log something for the `onDestroy` hook.
   */
  onDestroy: boolean;
  /**
   * Whether to log something for the `onConfigure` hook.
   */
  onConfigure: boolean;
}

export class Logger implements Extension {
  private logger: CommonLogger = new CommonLogger(Logger.name);

  configuration: LoggerConfiguration = {
    onLoadDocument: true,
    onChange: true,
    onStoreDocument: true,
    onConnect: true,
    onDisconnect: true,
    onUpgrade: true,
    onRequest: true,
    onDestroy: true,
    onConfigure: true,
  };

  /**
   * Constructor
   */
  constructor(configuration?: Partial<LoggerConfiguration>) {
    this.configuration = {
      ...this.configuration,
      ...configuration,
    };
    this.logger.log('Logger extension loaded.');
  }

  async onConfigure(data: onConfigurePayload) {
    if (!this.configuration.onConfigure) {
      return;
    }
  }

  async onLoadDocument(data: onLoadDocumentPayload) {
    if (this.configuration.onLoadDocument) {
      this.logger.log(`Loaded document "${data.documentName}".`);
    }
  }

  async onChange(data: onChangePayload) {
    if (this.configuration.onChange) {
      this.logger.log(`Document "${data.documentName}" changed.`);
    }
  }

  async onStoreDocument(data: onDisconnectPayload) {
    if (this.configuration.onStoreDocument) {
      this.logger.log(`Store "${data.documentName}".`);
    }
  }

  async onConnect(data: onConnectPayload) {
    if (this.configuration.onConnect) {
      this.logger.log(`New connection to "${data.documentName}".`);
    }
  }

  async onDisconnect(data: onDisconnectPayload) {
    if (this.configuration.onDisconnect) {
      this.logger.log(`Connection to "${data.documentName}" closed.`);
    }
  }

  async onUpgrade(data: onUpgradePayload) {
    if (this.configuration.onUpgrade) {
      this.logger.log('Upgrading connection …');
    }
  }

  async onRequest(data: onRequestPayload) {
    if (this.configuration.onRequest) {
      this.logger.log(`Incoming HTTP Request to ${data.request.url}`);
    }
  }

  async onDestroy(data: onDestroyPayload) {
    if (this.configuration.onDestroy) {
      this.logger.log('Shut down.');
    }
  }
}
