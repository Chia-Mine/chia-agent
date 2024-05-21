export interface APIAgent {
  sendMessage<M>(
    destination: string,
    command: string,
    data?: Record<string, unknown>,
  ): Promise<M>;
}
