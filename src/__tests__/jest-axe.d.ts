declare module 'jest-axe' {
  export function axe(container: HTMLElement): Promise<{
    violations: Array<{
      id: string;
      impact: string | null;
      description: string;
      nodes: Array<any>;
    }>;
  }>;
}
