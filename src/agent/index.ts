export interface APIAgent {
  sendMessage<M extends unknown>(
    destination: string,
    command: string,
    data?: Record<string, unknown>,
  ): Promise<M>;
}
