/**
 * Created by Administrator on 2015/10/19.
 */
/*
*   内存信息{ rss: 16703488, heapTotal: 9751808, heapUsed: 3911696 }
*   rss:进程常住内存
*   headTotal：申请到的堆内存
*   heapUser:
* */

console.log(process.memoryUsage());


console.log(process.cwd());   //当前的工作目录  随着 cd ..的切换而变化 e:\wodezhandian\nodejs\webstormnode\global