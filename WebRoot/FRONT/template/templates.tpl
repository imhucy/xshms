<script id="ContactList" type="text/template7">
{{#each student_list}}
<li>
	<a href="pages/personal/information-card.html" class="item-link toInfo">
		<div class="item-content">
			<div class="item-inner">
				<div class="item-title-row">
					<div class="item-title">{{student_name}}</div>
					<div class="item-after">{{student_tel}}</div>
				</div>
				<div class="item-subtitle stu_id">{{student_id}}</div>
			</div>
		</div>
	</a>
</li>
{{/each}}
</script>
<script id="DeptList" type="text/template7">
{{#each depts}}
  <option value="{{deptName}}">{{deptName}}</option>
{{/each}}
</script>
<script id="linkListTemplate" type="text/template7">
<div class="list-block">
<ul>
{{#each lists}}
  <li>
      <a href="{{url}}" class="item-link item-content">
          <div class="item-inner">
              <div class="item-title">{{text}}</div>
              <div class="item-after">{{datetime}}</div>
          </div>
      </a>
  </li>
{{/each}}
</ul>
</div>
</script>
<script id="panelTemplate" type="text/template7">
	<div class="list-block  media-list">
      <ul>
      	<li>
	      <a href="{{user.user_url}}" class="item-link item-content close-panel toInfo">
	        <div class="item-media user-photo">{{user.user_nickname}}</div>
	        <div class="item-inner">
	          <div class="item-title-row">
	            <div class="item-title">{{user.user_name}}</div>
	          </div>
	          <div class="item-subtitle">{{user.user_department}}{{user.user_position}}</div>
	        </div>
	      </a>
	    </li>
	    {{#each func_list}}
        <li>
	      <a href="{{url}}" class="item-link close-panel item-content">
	        <div class="item-inner">
	          <div class="item-title">{{name}}</div>
	        </div>
	      </a>
	    </li>
	    {{/each}}
      </ul>
    </div>
</script>

<script id="userInfoTemplate" type="text/template">
	<ul>
		<li>
			<div class="item-content">
				<div class="item-media user-photo">{{nickname}}</div>
				<div class="item-inner">
					<div class="item-title-row">
						<div class="item-title">{{name}}</div>
						<div class="item-lower">{{dept}}{{position}}</div>
					</div>
					<div class="item-subtitle">{{id}}</div>
				</div>
			</div>
		</li>
		<li>
			<div class="item-content">
				<div class="item-inner">
					<div class="item-title-row">
						<div class="item-title">性别</div>
						<div class="item-after">{{sex}}</div>
					</div>
				</div>
			</div>
		</li>
		<li>
			<div class="item-content">
				<div class="item-inner">
					<div class="item-title-row">
						<div class="item-title">班级</div>
						<div class="item-after">{{major}}{{class_id}}班</div>
					</div>
				</div>
			</div>
		</li>
		<li>
			<div class="item-content">
				<div class="item-inner">
					<div class="item-title-row">
						<div class="item-title">电话</div>
						<div class="item-after">{{tel}}</div>
					</div>
				</div>
			</div>
		</li>
		<li>
			<div class="item-content">
				<div class="item-inner">
					<div class="item-title-row">
						<div class="item-title">QQ</div>
						<div class="item-after">{{qq}}</div>
					</div>
				</div>
			</div>
		</li>
		<li>
			<div class="item-content">
				<div class="item-inner">
					<div class="item-title-row">
						<div class="item-title">邮箱</div>
						<div class="item-after">{{mail}}</div>
					</div>
				</div>
			</div>
		</li>
		<li>
			<div class="item-content">
				<div class="item-inner">
					<div class="item-title-row">
						<div class="item-title">生日</div>
						<div class="item-after">{{birth}}</div>
					</div>
				</div>
			</div>
		</li>
		<li>
			<div class="item-content">
				<div class="item-inner">
					<div class="item-title-row">
						<div class="item-title">家庭住址</div>
						<div class="item-after">{{addr}}</div>
					</div>
				</div>
			</div>
		</li>
		<li>
			<div class="item-content">
				<div class="item-inner">
					<div class="item-title">个人说明</div>
					<div class="item-lower">{{person_explain}}</div>
				</div>
			</div>
		</li>
	</ul>
</script>
    
<script id="tbTemplate" type="text/template7">
	{{#each class}}
    <optgroup label="{{name}}">
        {{#each menbers}}
        <option value="{{no}}">{{name}}({{no}})</option>
        {{/each}}
    </optgroup>
    {{/each}}
</script>
<!-- 查晚寝 -->
<script id="dormEveningTemplate" type="text/template7">
{{#each dormitory}}
<div class="content-block-title building-number">{{@key}}</div>
<div class="list-block accordion-list inset">
  <ul>
    {{#each this}}
    <li class="accordion-item" >
    <a href="#" class="item-link item-content room-students-prev">
        <div class="item-inner"> 
        	<!--寝室号-->
          <div class="item-title room-number">{{@key}}</div>
          <div class="item-after">
          	<input type="button" value="寝室情况(无)" data-popover=".popover-menu" class="dormitory-check button " />
          </div>
        </div>
    </a>
        <div class="accordion-item-content" id="room-number-{{@key}}">
          <div class="list-block media-list">
            <ul>
              {{#each this}}
              <li class="student">
	              <a href="#" class="item-link smart-select">
		              <select name="{{id}}">
		              	  <option value="无" selected="selected">无</option>
		                  <option value="未归">未归</option>
		                  <option value="晚归">晚归</option>
		                  <option value="请假">请假</option>
		              </select>
		              <div class="item-content">
		                <div class="item-inner">
		                	
		                	<div class="item-title-row">
								<div class="item-title">{{bed}}号床-{{name}}</div>
								<div class="item-after breach-the-principle">无</div>
							</div>
							<div class="item-subtitle">{{id}}</div>
		                  
		                </div>
		              </div>
	              </a>
              </li>
              {{/each}}
            </ul>
          </div>
        </div>
    </li>
    {{/each}}
  </ul>
</div>
{{/each}}
</script>
<!-- 查早寝 -->
<script id="dormTemplate" type="text/template7">
  {{#each dormitory}}
  <!-- 楼栋号 -->
  <div class="content-block-title">{{@key}}</div>
  <div class="list-block accordion-list inset">
	  <ul>
	  	{{#each this}}
	    <li class="accordion-item">
	      <a href="#" class="item-link item-content room-students-prev">
	        <div class="item-inner"> 
	        	<!--寝室号-->
	          <div class="item-title room-number">{{@key}}</div>
	          <div class="item-after">
	          	<input type="button" value="寝室情况(无)" data-popover=".popover-menu" class="dormitory-check button open-popover" />
	          </div>
	        </div>
	      </a>
	        <div class="accordion-item-content">
	          <div class="list-block media-list">
	            <ul>
	              {{#each this}}
	              <!-- 学生个人情况 -->
	              <li class="student">
	              	<a href="#" class="item-link smart-select">
		              <select name="{{id}}">
		              	  <option value="无" selected="selected">无</option>
		                  <option value="未起床">未起床</option>
		                  <option value="未叠被子">未叠被子</option>
		                  <option value="请假">请假</option>
		              </select>
		              <div class="item-content">
		                <div class="item-inner">
		                	<div class="item-title-row">
		                  		<div class="item-title">{{bed}}号床-{{name}}</div>
		                  		<div class="item-after breach-the-principle">无</div>
		                  	</div>
		                  	<div class="item-subtitle student-id">{{id}}</div>
		                </div>
		              </div>
		             </a>
	              </li>
	              {{/each}}
	            </ul>
	          </div>
	        </div>
	    </li>
	    {{/each}}
	  </ul>
	</div>
	{{/each}}
</script>

<script id="exerciseTemplate" type="text/template7">
{{#each classes}}
<li class="accordion-item">
	<a href="#" class="item-link item-content">
		<div class="item-inner">
			<!--年级和班级-->
			<div class="item-title">{{name}}</div>
		</div>
	</a>
	<div class="accordion-item-content">
		<div class="list-block media-list">
			<ul>
				{{#each students}}
				<li>
					<a href="#" class="item-link smart-select">
						<select name="work-attendance">
							<option value="已到" selected="selected">已到</option>
							<option value="缺席">缺席</option>
							<option value="请假">请假</option>
						</select>
						<div class="item-content">
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title">{{name}}</div>
									<div class="item-after exercise-result">已到</div>
								</div>
								<div class="item-subtitle">{{id}}</div>
							</div>
						</div>
					</a>
				</li>
				{{/each}}
			</ul>
		</div>
	</div>
</li>
{{/each}}
</script>

<script id="meetingTemplate" type="text/template7">
{{#each departments}}
<li class="accordion-item">
	<a href="#" class="item-link item-content">
		<div class="item-inner">
			<!--部门名-->
			<div class="item-title">{{name}}</div>
		</div>
	</a>
	<div class="accordion-item-content">
		<div class="list-block media-list">
			<ul>{{#each menbers}}
				<li>
					<a href="#" class="item-link smart-select">
						<select name="fruits">
							<option value="已到">已到</option>
							<option value="缺席" selected="selected">缺席</option>
							<option value="请假">请假</option>
						</select>
						<div class="item-content">
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title">{{name}}</div>
									<div class="item-after meeting-result">缺席</div>
								</div>
								<div class="item-subtitle">{{id}}</div>
							</div>
						</div>
					</a>
				</li>{{/each}}
			</ul>
		</div>
	</div>
</li>
{{/each}}
</script>

<script id="lessonCheckTemplate" type="text/template7">
<li>
	<a href="#" data-searchbar="true" data-searchbar-placeholder="请输入名字以搜索" 
		class="item-link smart-select"  data-page-title="选择通报名单" data-back-text="确认">
	    <select name="students" multiple>
	        {{#each classes}}
	        <optgroup label="{{name}}">
	            {{#each students}}
	            <option value="{{id}}">{{name}}({{id}})</option>
	            {{/each}}
	        </optgroup>
	        {{/each}}
	    </select>
	    <div class="item-content">
	        <div class="item-inner">
	        	<div class="item-title-row">
	        		<div class="item-title">缺席名单</div>
	        	</div>
	        	<div class="item-text"><span class="item-after student-list"></span></div>
	        </div>
	    </div>
    </a>
</li>
</script>