declare module '@hocuspocus/provider' {
    import { Doc } from 'yjs';
  
    interface TiptapCollabProviderOptions {
      appId: string;
      name: string;
      document: Doc;
    }
  
    export class TiptapCollabProvider {
      constructor(options: TiptapCollabProviderOptions);
      connect(): void;
      disconnect(): void;
      on(event: string, callback: (...args: any[]) => void): void;
      off(event: string, callback: (...args: any[]) => void): void;
    }
  }
  