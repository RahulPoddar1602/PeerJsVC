// Create a Peer object with a random ID
const peer = new Peer();
peer.on('open', function(id) {
	console.log('My peer ID is: ' + id);
  });

// Get access to the local camera and microphone
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(localStream => {
    const localVideo = document.getElementById('localVideo');
    localVideo.srcObject = localStream;

    // Answer incoming calls
    peer.on('call', incomingCall => {
      // Answer the call and send the local stream
      incomingCall.answer(localStream);

      // Display the remote stream
      const remoteVideo = document.getElementById('remoteVideo');
      incomingCall.on('stream', remoteStream => {
        remoteVideo.srcObject = remoteStream;
      });
    });

    // Make a call to a remote peer
    const callButton = document.getElementById('callButton');
    callButton.addEventListener('click', () => {
      const remotePeerID = document.getElementById('remotePeerID').value;
      const call = peer.call(remotePeerID, localStream);

      // Display the remote stream
      const remoteVideo = document.getElementById('remoteVideo');
      call.on('stream', remoteStream => {
        remoteVideo.srcObject = remoteStream;
      });
    });
  })
  .catch(error => {
    console.error('Error accessing media devices:', error);
  });
