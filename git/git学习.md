# 一 回退
```
1.有用的命令  假如我在分支 进行某个文件的操作(hehe.js)   写了很多代码 但是发现不想用了 ,  想用之前head里最新的代码覆盖当前的文件  那么就  git checkout [filename] 即可 复原之前一次add或者commit的代码
checkout --[filename] 还原没提交之前的
-------------
2.	这里的回退 是 之前分支已经  commit的版本  可以通过  git log 查看版本号 以及 之前所有提交的 message的信息
	git reset --hard HEAD^ 回退上一个版本，

	git reset --hard HEAD^^  回退上2个版本，

	git reset --hard HEAD~100  回退上100个版本，


小结：

场景1：若只是修改了(no add no commit )工作区的内容， git checkout -- 文件名 ，可以直接丢弃工作区的修改   -- 后面有个空格

场景2：若已经提交到了(add)暂存区，用git reset HEAD 文件名，直接回到场景1.

场景3：若已经提交到了(commit)分支，参看上面的版本回退。     （git reset --hard 版本号/HARD^    用来回退）



````
# 二 查看区别 

```
1.查看不同的地方  git diff HEAD -- [filename]
	
	如果本地修改了,没有add也没有commit可以用 git diff [filename] 查看不同的地方, 如果已经add了,用git diff HEAD -- [filename] 查看版本库和当前的不同

````

#三 删除

```
如果误删除可用 git reset --hard HEAD^来还原之前的文件

```


#合并分支的时候 用  git merge --no-ff [branchname] -m 'message' 可以不会把head指向分支末梢 最好的方案