export const accessChannel = (socket, roomData) => {
    console.log(roomData)
    return () => {
        socket?.emit("accessChannel", roomData);

        return  () => {
            if (socket)
                socket.emit("leavechannel", roomData);
        }
    }
}