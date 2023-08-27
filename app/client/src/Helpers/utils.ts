const MAX_LENGTH:number = 20

function shortenMessage(mess:string) :string {
    if (mess?.length < MAX_LENGTH)
        return mess;
    return (mess?.slice(0, 9) + "...")
}

export {shortenMessage}