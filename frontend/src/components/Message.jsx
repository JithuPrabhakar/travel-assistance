function Message({ message }) {
  return (
    <div role="alert">
      {/* <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        Danger
      </div> */}
      <div className="border  border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;
