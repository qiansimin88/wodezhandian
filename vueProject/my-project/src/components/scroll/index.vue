<style>
	 * {
      padding: 0;
      margin: 0;
      -webkit-user-select: none;
      -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
    }
    html, body {
      height: 100%;
      -webkit-overflow-scrolling: touch;
    }
    .example-title {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 20px;
      background-color: #dddddd;
    }
    .example-list {
      padding: 4px 4px 0;
      list-style: none;
    }
    .example-listitem {
      height: 50px;
      line-height: 50px;
      border: solid 1px #999;
      border-radius: 2px;
      margin-bottom: 4px;
      text-align: center;
    }
    .example-listitem:last-child {
      margin-bottom: 0;
    }
    #list {
      height: 800px;
      overflow: scroll;
    }
    .kebab-loadmore-top span {
      display: inline-block;
      transition: .2s linear;
    }
    .rotate {
      transform: rotate(180deg);
    }
</style>
<template>
	<div id="list">
		<loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded">
			 <ul class="example-list">
  			 	<li class="example-listitem" v-for="item in dateList">{{ item }}</li>
  			 </ul>
		</loadmore>
	</div>
</template>

<script>
	import Loadmore from 'vue-loadmore';
	export default {
		components : {
			Loadmore
		},
		data () {
			return {
				dateList : []
			}
		},
		ready () {
			this.dateList = (function () {
				let full = [];
				for(let i = 0 ;i< 20;i++) {
					full.push(i)
				}
				return full
			})()
		
		},
		methods :  {
			 loadBottom(id) {
		      setTimeout(() => {
		        let lastValue = this.dateList[this.dateList.length - 1];
		        if (lastValue < 40) {
		          for (let i = 1; i <= 10; i++) {
		            this.dateList.push(lastValue + i);
		          }
		        } else {
		          this.allLoaded = true;
		        }
		        this.$broadcast('onBottomLoaded', id);
		      }, 1500);
		    }
		}
	}
</script>