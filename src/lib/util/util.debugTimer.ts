export class DebugTimer {
  private readonly start = new Date()
  public report = this.reportTime.bind(this)
  /**
   * @description returns milliseconds since start
   */
  reportTime (): number {
    return new Date().getTime() - this.start.getTime()
  }
}
