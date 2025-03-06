export class AppRoutingBuilder {
  private static slash: string = '/';

  /**
   * Given path-keys as an array
   * This method constructs the path string
   * Gets every string in array
   * Puts an / before
   * Adds it to the string that will be returned
   * @param keys
   * @return string
   */
  public static fullPath(keys: string[]): string {
    return keys.map((key: string) => this.slash + key)
      .join('');
  }
}
