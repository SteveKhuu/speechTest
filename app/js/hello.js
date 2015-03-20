window.helloText = function() {
  return 'Hello, World!';
};

window.hello = function() {
//  html = JST['app/templates/hello.us']({text: helloText()});
//  document.body.innerHTML += html;
  
  var speechTranscriber = new SpeechApp.SpeechTranscriber(annyang);
  var speechView = new SpeechApp.SpeechView();
  
  SpeechApp.Observer.make(speechTranscriber);
  SpeechApp.Observer.make(speechView);
  
  speechTranscriber.listenForWords();
  speechTranscriber.addSubscriber(speechView.drawTranscribedSpeech);
  
  speechView.addSubscriber(speechTranscriber.updateLanguage);
  
  speechView.init();
};

if(window.addEventListener) {
    window.addEventListener('DOMContentLoaded', hello, false);
} else {
    window.attachEvent('onload', hello);
}
