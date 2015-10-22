package com.xsh.domain;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sf.json.JSONObject;
import net.sf.json.JSONString;

/**
 * Useres entity. @author MyEclipse Persistence Tools
 */

public class Useres implements java.io.Serializable,JSONString {

	// Fields

	private Integer id;
	private Role role;
	private Student student;
	private Department department;
	private String qq;
	private String mail;
	private Date birth;
	private String addr;
	private String personExplain;
	private String position;
	private String englishLevel;
	private Short flunk;
	private Short score;
	private Short posState;
	private String psw;
	private String tel;

	// Constructors

	/** default constructor */
	public Useres() {
	}
	
	public String toJSONString() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		
		return "{\"id\":\"" + id + "\",\"student\":" + JSONObject.fromObject(student)
				+ ",\"qq\":\"" + qq + "\",\"mail\":\""
				+ mail + "\",\"birth\":\"" + sdf.format(birth) + "\",\"addr\":\"" + addr
				+ "\",\"personExplain\":\"" + personExplain + "\",\"position\":\"" + position
				+ "\",\"englishLevel\":\"" + englishLevel + "\",\"flunk\":\"" + flunk
				+ "\",\"score\":\"" + score + "\",\"posState\":\"" + posState + "\",\"psw\":\""
				+ psw + "\",\"tel\":\"" + tel + /*"\",\"role\":\"" + role 
				+*/ "\",\"department\":" + JSONObject.fromObject(department) +"}";
	}

	@Override
	public String toString() {
		return "Useres [id=" + id + ", role=" + role + ", student=" + student
				+ ", department=" + department + ", qq=" + qq + ", mail="
				+ mail + ", birth=" + birth + ", addr=" + addr
				+ ", personExplain=" + personExplain + ", position=" + position
				+ ", englishLevel=" + englishLevel + ", flunk=" + flunk
				+ ", score=" + score + ", posState=" + posState + ", psw="
				+ psw + ", tel=" + tel + "]";
	}

	/** minimal constructor */
	public Useres(Student student, Department department, String position) {
		this.student = student;
		this.department = department;
		this.position = position;
	}

	/** full constructor */
	public Useres(Role role, Student student, Department department, String qq,
			String mail, Date birth, String addr, String personExplain,
			String position, String englishLevel, Short flunk, Short score,
			Short posState, String psw, String tel) {
		this.role = role;
		this.student = student;
		this.department = department;
		this.qq = qq;
		this.mail = mail;
		this.birth = birth;
		this.addr = addr;
		this.personExplain = personExplain;
		this.position = position;
		this.englishLevel = englishLevel;
		this.flunk = flunk;
		this.score = score;
		this.posState = posState;
		this.psw = psw;
		this.tel = tel;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Role getRole() {
		return this.role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Student getStudent() {
		return this.student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public Department getDepartment() {
		return this.department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	public String getQq() {
		return this.qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}

	public String getMail() {
		return this.mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public Date getBirth() {
		return this.birth;
	}

	public void setBirth(Date birth) {
		this.birth = birth;
	}

	public String getAddr() {
		return this.addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public String getPersonExplain() {
		return this.personExplain;
	}

	public void setPersonExplain(String personExplain) {
		this.personExplain = personExplain;
	}

	public String getPosition() {
		return this.position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getEnglishLevel() {
		return this.englishLevel;
	}

	public void setEnglishLevel(String englishLevel) {
		this.englishLevel = englishLevel;
	}

	public Short getFlunk() {
		return this.flunk;
	}

	public void setFlunk(Short flunk) {
		this.flunk = flunk;
	}

	public Short getScore() {
		return this.score;
	}

	public void setScore(Short score) {
		this.score = score;
	}

	public Short getPosState() {
		return this.posState;
	}

	public void setPosState(Short posState) {
		this.posState = posState;
	}

	public String getPsw() {
		return this.psw;
	}

	public void setPsw(String psw) {
		this.psw = psw;
	}

	public String getTel() {
		return this.tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

}