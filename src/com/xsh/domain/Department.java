package com.xsh.domain;

import java.util.HashSet;
import java.util.Set;

import net.sf.json.JSONString;

/**
 * Department entity. @author MyEclipse Persistence Tools
 */

public class Department implements java.io.Serializable,JSONString {

	// Fields

	private Integer id;
	private String name;
	private Integer departmentLibId;
	private String introduce;
	private String institution;
	private Integer score;
	private String logs;
	private Integer numbers;
	private Set usereses = new HashSet(0);

	// Constructors

	/** default constructor */
	public Department() {
	}

	public String toJSONString() {
//		this.introduce = introduce.replace("\r\n", "<br />");
		
		return "{\"id\":\"" + id + "\",\"name\":\"" + name + "\",\"departmentLibId\":\""
				+ departmentLibId + "\",\"introduce\":\"" + introduce
				+ "\",\"institution\":\"" + institution + "\",\"score\":\"" + score
				+ "\",\"logs\":\"" + logs + "\",\"numbers\":\"" + numbers + "\"}";
	}

	@Override
	public String toString() {
		return "Department [id=" + id + ", name=" + name + ", departmentLibId="
				+ departmentLibId + ", introduce=" + introduce
				+ ", institution=" + institution + ", score=" + score
				+ ", logs=" + logs + ", numbers=" + numbers + "]";
	}

	/** minimal constructor */
	public Department(String name, Integer departmentLibId, String introduce,
			String institution, Integer numbers) {
		this.name = name;
		this.departmentLibId = departmentLibId;
		this.introduce = introduce;
		this.institution = institution;
		this.numbers = numbers;
	}

	/** full constructor */
	public Department(String name, Integer departmentLibId, String introduce,
			String institution, Integer score, String logs, Integer numbers,
			Set usereses) {
		this.name = name;
		this.departmentLibId = departmentLibId;
		this.introduce = introduce;
		this.institution = institution;
		this.score = score;
		this.logs = logs;
		this.numbers = numbers;
		this.usereses = usereses;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getDepartmentLibId() {
		return this.departmentLibId;
	}

	public void setDepartmentLibId(Integer departmentLibId) {
		this.departmentLibId = departmentLibId;
	}

	public String getIntroduce() {
		return this.introduce;
	}

	public void setIntroduce(String introduce) {
		this.introduce = introduce;
	}

	public String getInstitution() {
		return this.institution;
	}

	public void setInstitution(String institution) {
		this.institution = institution;
	}

	public Integer getScore() {
		return this.score;
	}

	public void setScore(Integer score) {
		this.score = score;
	}

	public String getLogs() {
		return this.logs;
	}

	public void setLogs(String logs) {
		this.logs = logs;
	}

	public Integer getNumbers() {
		return this.numbers;
	}

	public void setNumbers(Integer numbers) {
		this.numbers = numbers;
	}

	public Set getUsereses() {
		return this.usereses;
	}

	public void setUsereses(Set usereses) {
		this.usereses = usereses;
	}

}