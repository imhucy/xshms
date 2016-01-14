var Excute = require('./routes/libs/excute');
var excute = new Excute(__dirname);
console.log(excute)

setTimeout(function () {
	excute.query('select * from power where power_type = 1',

		function (results) {
			
			console.log('================>\n' + JSON.stringify( results ) );

			excute.close();
		}
		
	);
},3000);


function treeMenu(a){
    this.tree=a||[];
    this.groups={};
};
treeMenu.prototype={
    init:function(pid){
      this.flag = true;
      this.group();
      return this.getDom(this.groups[pid]);
    },
    group:function(){
      for(var i=0;i<this.tree.length;i++){
        if(this.groups[this.tree[i].parent_id]){
          this.groups[this.tree[i].parent_id].push(this.tree[i]);
        }else{
          this.groups[this.tree[i].parent_id]=[];
          this.groups[this.tree[i].parent_id].push(this.tree[i]);
        }
      }
      console.log( JSON.stringify(this.groups) )
    },
    getDom:function(a){
      if(!a){return ''}
      if(this.flag)
        var html='\n<ul class="nav main-menu">\n';
      else{
        var html='\n<ul class="dropdown-menu">\n';
        this.flag = !this.flag;
      }
      for(var i=0;i<a.length;i++){
        html+='<li class="dropdown">';
        html+='<a href="javascript:;" class="dropdown-toggle">';
        html+='<i class="fa fa-desktop"></i>';
        html+='<span class="hidden-xs">'+a[i].power_name+'</span>';
        html+='</a>';
        html+=this.getDom(this.groups[a[i].id]);
        html+='</li>\n';
      };
      html+='</ul>\n';
      return html;
    }
};