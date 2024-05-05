interface Listener {
  /**
   * Vehicle located.
   *
   * @param {object} data
   */
  locate(data: any): void;

  /**
   * Vehicle status data.
   *
   * @param {object} data
   */
  status(data: any): void;

  /**
   * Update the listener with response status.
   *
   * @param {number} status
   */
  update(status: number): void;

  /**
   * Get all vehicles.
   *
   * @return {array}
   */
  get vehicles(): Array<any>;

  /**
   * Get the current vehicle.
   *
   * @return {object}
   */
  get vehicle(): any;
}
