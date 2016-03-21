<script id="ContactList" type="text/template7">
	{{#each student_list}}
	<li>
		<a href="pages/personal/information-card.html" data-value="{{id}}" class="item-link toInfo">
			<div class="item-content">
				<div class="item-inner">
					<div class="item-title-row">
						<div class="item-title">{{student_name}}</div>
						<div class="item-after">{{student_mobile}}</div>
					</div>
					<div class="item-subtitle stu_id">{{student_id}}</div>
				</div>
			</div>
		</a>
	</li>
	{{/each}}
</script>
<script id="VolunteerList" type="text/template7">
	{{#each value}}
	<li>
		<div class="item-content">
			<div class="item-inner">
				<div class="item-title-row">
					<div class="item-title">{{student_name}}</div>
					<div class="item-after">{{student_mobile}}</div>
				</div>
				<div class="item-subtitle">{{student_id}}</div>
			</div>
		</div>
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
				<a href="{{url}}" data-value='{{content}}' class="item-link item-content">
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
				<a href="pages/personal/information-card.html" data-value="{{useres_id}}" class="item-link item-content close-panel toInfo">
					<div class="item-media user-photo">{{useres_nickname}}</div>
					<div class="item-inner">
						<div class="item-title-row">
							<div class="item-title">{{useres_name}}</div>
						</div>
						<div class="item-subtitle">{{role_name}}</div>
					</div>
				</a>
			</li>
			{{#each power_list}}
			<li>
				<a href="{{power_url}}" class="item-link close-panel item-content">
					<div class="item-inner">
						<div class="item-title">{{power_name}}</div>
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
				<div class="item-media user-photo">{{useres_nickname}}</div>
				<div class="item-inner">
					<div class="item-title-row">
						<div class="item-title">{{useres_name}}</div>
						<div class="item-lower">{{role_name}}</div>
					</div>
					<div class="item-subtitle">{{student_id}}</div>
				</div>
			</div>
		</li>
		<li>
			<div class="item-content">
				<div class="item-inner">
					<div class="item-title-row">
						<div class="item-title">性别</div>
						<div class="item-after">{{student_sex}}</div>
					</div>
				</div>
			</div>
		</li>
		<li>
			<div class="item-content">
				<div class="item-inner">
					<div class="item-title-row">
						<div class="item-title">班级</div>
						<div class="item-after">{{classes_name}}</div>
					</div>
				</div>
			</div>
		</li>
		<li>
			<div class="item-content">
				<div class="item-inner">
					<div class="item-title-row">
						<div class="item-title">电话</div>
						<div class="item-after">{{student_mobile}}</div>
					</div>
				</div>
			</div>
		</li>
		<li>
			<div class="item-content">
				<div class="item-inner">
					<div class="item-title-row">
						<div class="item-title">QQ</div>
						<div class="item-after">{{usr_qq}}</div>
					</div>
				</div>
			</div>
		</li>
		<li>
			<div class="item-content">
				<div class="item-inner">
					<div class="item-title-row">
						<div class="item-title">邮箱</div>
						<div class="item-after">{{usr_email}}</div>
					</div>
				</div>
			</div>
		</li>
		<li>
			<div class="item-content">
				<div class="item-inner">
					<div class="item-title-row">
						<div class="item-title">生日</div>
						<div class="item-after">{{usr_birth}}</div>
					</div>
				</div>
			</div>
		</li>
		<li>
			<div class="item-content">
				<div class="item-inner">
					<div class="item-title-row">
						<div class="item-title">地址</div>
						<div class="item-after">{{usr_addr}}</div>
					</div>
				</div>
			</div>
		</li>
		<li>
			<div class="item-content">
				<div class="item-inner">
					<div class="item-title">入职宣言</div>
					<div class="item-lower">{{usr_desc}}</div>
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
			<li class="accordion-item">
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
									<select name="{{student_id}}">
										<option value="无" selected="selected">无</option>
										<option value="未归">未归</option>
										<option value="晚归">晚归</option>
										<option value="请假">请假</option>
									</select>
									<div class="item-content">
										<div class="item-inner">

											<div class="item-title-row">
												<div class="item-title">{{student_bed}}号床-{{student_name}}</div>
												<div class="item-after breach-the-principle">无</div>
											</div>
											<div class="item-subtitle">{{student_id}}</div>

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
									<select name="{{student_id}}">
										<option value="无" selected="selected">无</option>
										<option value="未起床">未起床</option>
										<option value="未叠被子">未叠被子</option>
										<option value="请假">请假</option>
									</select>
									<div class="item-content">
										<div class="item-inner">
											<div class="item-title-row">
												<div class="item-title">{{student_bed}}号床-{{student_name}}</div>
												<div class="item-after breach-the-principle">无</div>
											</div>
											<div class="item-subtitle student-id">{{student_id}}</div>
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
								<option value="已到">已到</option>
								<option value="缺席" selected="selected">缺席</option>
								<option value="请假">请假</option>
							</select>
							<div class="item-content">
								<div class="item-inner">
									<div class="item-title-row">
										<div class="item-title">{{name}}</div>
										<div class="item-after exercise-result">缺席</div>
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
				<div class="item-title">{{@key}}</div>
			</div>
		</a>
		<div class="accordion-item-content">
			<div class="list-block media-list">
				<ul>{{#each this}}
					<li>
						<a href="#" class="item-link smart-select">
							<select name="{{id}}">
								<option value="14">缺席</option>
								<option value="0">已到</option>
								<option value="22">请假</option>
							</select>
							<div class="item-content">
								<div class="item-inner">
									<div class="item-title-row">
										<div class="item-title">{{student_name}}</div>
										<div class="item-after meeting-result">缺席</div>
									</div>
									<div class="item-subtitle">{{student_id}}</div>
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
<script id="taskTemplate" type="text/template7">
{{#each taskList}}
<li>
  <a href="#" class="item-link item-content">
    <div class="item-inner">
      <div class="item-title-row" style="background-image:none;">
        <div class="item-title">{{task_name}}</div>
        <!-- 发布时间 -->
        <div class="item-after">{{task_date}}</div>
      </div>
      <div class="item-subtitle row"><span class="task-status-{{task_status_id}}">{{task_status_name}}</span></div>
      <div class="item-txt task-detail">{{task_content}}</div>
    </div>
  </a>
</li>
{{/each}}
</script>
<script id="lessonCheckTemplate" type="text/template7">
	<li>
		<a href="#" data-searchbar="true" data-searchbar-placeholder="请输入名字以搜索" class="item-link smart-select" data-page-title="选择通报名单" data-back-text="确认">
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
<!-- 查课通报模板 -->
<script id="lessonCheckNoticeTemplate" type="text/template7">
	<div class="content-block-title">{{title}}
		<br /><span class="content-block-subtitle">发布时间：{{datetime}}</span></div>
	<div class="content-block-title"></div>
	<div class="list-block accordion-list">
		<ul>
			{{#each students}}
			<li class="accordion-item">
				<a href="#" class="item-link item-content">
					<div class="item-inner">
						<!-- 星期 -->
						<div class="item-title">{{@key}}</div>
					</div>
				</a>
				<div class="accordion-item-content">
					<div class="list-block  media-list">
						<ul>
							{{#each this}}
							<li>
								<div class="item-content">
									<div class="item-media circle circle-blue">{{lessonNumber}}</div>
									<div class="item-inner">
										<div class="item-title-row">
											<!-- 处分人 -->
											<div class="item-title">{{student_name}}</div>
											<!-- 班级 -->
											<div class="item-after">{{classes_name}}班</div>
										</div>
										<!--扣分-->
										<div class="item-subtitle">扣分：{{score}}</div>
										<!-- 处分项 -->
										<div class="item-text">{{dop_name}} <br /> {{datetime}}</div>
									</div>
								</div>
							</li>
							{{/each}}
						</ul>
					</div>
				</div>
			</li>
			{{/each}}
		</ul>
	</div>
</script>

<script id="dormCheckNoticeTemplate" type="text/template7">

	<div class="content-block-title">{{title}}
		<br /><span class="content-block-subtitle">发布时间：{{datetime}}</span> </div>
	<div class="content-block-title"></div>
	<div class="list-block accordion-list">
		<ul>
			{{#each students}}
			<li class="accordion-item">
				<a href="#" class="item-link item-content">
					<div class="item-inner">
						<!--楼栋号-->
						<div class="item-title">{{@key}}</div>
					</div>
				</a>
				<div class="accordion-item-content">
					<div class="list-block  media-list">
						<ul>
							{{#each this}}
							<li>
								<div class="item-content">
									<div class="item-media circle circle-blue">{{student_room}}#{{student_bed}}</div>
									<div class="item-inner">
										<div class="item-title-row">
											<!-- 处分人 -->
											<div class="item-title">{{student_name}}</div>
											<!-- 班级 -->
											<div class="item-after">{{classes_name}}班</div>
										</div>
										<!--扣分-->
										<div class="item-subtitle">扣分：{{score}}</div>
										<!-- 处分项 -->
										<div class="item-text">{{dop_name}} <br /> {{datetime}}</div>
									</div>
								</div>
							</li>
							{{/each}}
						</ul>
					</div>
				</div>
			</li>
			{{/each}}
		</ul>
	</div>
</script>
<!--通报批评-->
<script id="PPNoticeTemplate" type="text/template7">
<div class="content-block-title">{{title}}<br /><span class="content-block-subtitle">发布时间：{{datetime}}</span></div>
<div class="list-block media-list">
	<ul>
		{{#each students}}
		<li>
			<div class="item-content">
				<div class="item-inner">
					<div class="item-title-row">
						<!-- 处分人名字 -->
						<div class="item-title">{{student_name}}</div>
						<!-- 班级 -->
						<div class="item-after">{{classes_name}}</div>
					</div>
					<!-- 扣分 -->
					<div class="item-subtitle">扣分：{{score}}</div>
					<!-- 扣分项 -->
					<div class="item-text">{{dop_name}} <br /> {{datetime}}</div>
				</div>
			</div>
		</li>
		{{/each}}
	</ul>
</div>
</script>
<!--通报表扬-->
<script id="BYNoticeTemplate" type="text/template7">
<div class="content-block-title">{{title}}<br /><span class="content-block-subtitle">发布时间：{{datetime}}</span></div>
	<div class="list-block media-list">
		<ul>
			{{#each people}}
			<li>
				<div class="item-content">
					<div class="item-inner">
						<div class="item-title-row">
							<!-- 处分人名字 -->
							<div class="item-title">{{student_name}}</div>
							<!-- 班级 -->
							<div class="item-after">{{classes_name}}</div>
						</div>
						<!-- 加分 -->
						<div class="item-subtitle">加分{{score}}</div>
						<!-- 加分项 -->
						<div class="item-text">{{dop_name}} <br /> {{datetime}}</div>
					</div>
				</div>
			</li>
			{{/each}}
		</ul>
	</div>
</script>