// addListener ��
// on  ��
// onece ����һ��
// removedListener()  //�Ƴ�ĳ������
// emit(event,param...)   ��һ���������¼�  ����Ĳ������Դ��� on�� �¼��Ļص������Ĳ���


var EventEmitter = require('events').EventEmitter;

var eventList = new EventEmitter();

//ע���¼�
eventList.on('hungry',function () {
    console.log('21');
});

//����һ�ξͽ��
eventList.once('love',function (){
    console.log('�Ǻ�');
});

//�Ƴ����м���
// eventList.removeAllListeners();
 
//�����¼�
eventList.emit( 'hungry');      
eventList.emit('love');

//�鿴ĳ���¼��м�����������   ������ʽ  [ [Function] ]
console.log(eventList.listeners("hungry"));
