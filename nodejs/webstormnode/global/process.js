/**
 * Created by Administrator on 2015/10/19.
 */
/*
* Ӧ�ó����ǽ�����Ķ���ʵ��
* ��nodejs���� process �������nodeӦ�ó���
* ���Ի�ȡӦ�ó���ĺ��û������л�������Ϣ
* */


/*
*
* */
//btn.addEventListener('click',fn) ����
//process.stdin.on('data',function (d){  //��������̨������ Ȼ���������
//    process.stdout.write(d)
//});

//����̨������  ��ȡ���еĲ���
//process.argv.forEach(function (item){
//    console.log(item);  //�ֱ��ӡ������̨�ĵĲ��� ��һ����nodeλ�� �ڶ������ļ�λ�� ���������ǲ���
//});

//�������˳���ʱ�����������
//process.on('exit',function (){
//    console.log('clear');
//})

//���û�в�����쳣��Ϣ
process.on('uncaughtException',function (err){
    console.log(err);  //��ӡ������Ϣ[ReferenceError: heheda is not defined]
});

heheda();  //�����ڵĺ���

console.log('��û����Ϊheehda����û�� ��ɳ����ж��쳣');




