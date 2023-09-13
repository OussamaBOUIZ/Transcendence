const MAX_LENGTH:number = 13

function shortenMessage(mess:string) :string {
    if (mess?.length < MAX_LENGTH)
        return mess;
    return (mess?.slice(0, 9) + "...")
}

function capitalize(inputString: string | undefined): string | undefined {
    if (inputString === undefined)
      return undefined
    if (inputString.length > 0) {
      return inputString[0].toUpperCase() + inputString.slice(1);
    } else {
      return inputString;
    }
  }
  
  // Example usage:
  
export {shortenMessage, capitalize}