package com.xsh.domain;

import java.util.HashSet;
import java.util.Set;

import net.sf.json.JSONString;

/**
 * Student entity. @author MyEclipse Persistence Tools
 */

public class Student implements java.io.Serializable,JSONString {

	// Fields

	private String id;
	private Classes classes;
	private String name;
	private String sex;
	private String building;
	private Integer room;
	private Integer bed;
	private Set usereses = new HashSet(0);
	private Set attendancesForAStudent = new HashSet(0);
	private Set attendancesForAAttendanceman = new HashSet(0);
	private Set morals = new HashSet(0);
	private Set attendancesForACheckman = new HashSet(0);

	// Constructors

	/** default constructor */
	public Student() {
	}

	public String toJSONString() {
		
		return "{\"id\":\"" + id + "\",\"name\":\"" + name + "\",\" sex\":\"" + sex
				+ "\",\" building\":\"" + building + "\",\" room\":\"" + room + "\",\" bed\":\"" + bed
				+ "\"}";
	}
	
	@Override
	public String toString() {
		return "Student [id=" + id + ", name=" + name + ", sex=" + sex
				+ ", building=" + building + ", room=" + room + ", bed=" + bed
				+ "]";
	}

	/** minimal constructor */
	public Student(Classes classes, String name, String sex, String building,
			Integer room, Integer bed) {
		this.classes = classes;
		this.name = name;
		this.sex = sex;
		this.building = building;
		this.room = room;
		this.bed = bed;
	}

	/** full constructor */
	public Student(Classes classes, String name, String sex, String building,
			Integer room, Integer bed, Set usereses,
			Set attendancesForAStudent, Set attendancesForAAttendanceman,
			Set morals, Set attendancesForACheckman) {
		this.classes = classes;
		this.name = name;
		this.sex = sex;
		this.building = building;
		this.room = room;
		this.bed = bed;
		this.usereses = usereses;
		this.attendancesForAStudent = attendancesForAStudent;
		this.attendancesForAAttendanceman = attendancesForAAttendanceman;
		this.morals = morals;
		this.attendancesForACheckman = attendancesForACheckman;
	}

	// Property accessors

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Classes getClasses() {
		return this.classes;
	}

	public void setClasses(Classes classes) {
		this.classes = classes;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSex() {
		return this.sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getBuilding() {
		return this.building;
	}

	public void setBuilding(String building) {
		this.building = building;
	}

	public Integer getRoom() {
		return this.room;
	}

	public void setRoom(Integer room) {
		this.room = room;
	}

	public Integer getBed() {
		return this.bed;
	}

	public void setBed(Integer bed) {
		this.bed = bed;
	}

	public Set getUsereses() {
		return this.usereses;
	}

	public void setUsereses(Set usereses) {
		this.usereses = usereses;
	}

	public Set getAttendancesForAStudent() {
		return this.attendancesForAStudent;
	}

	public void setAttendancesForAStudent(Set attendancesForAStudent) {
		this.attendancesForAStudent = attendancesForAStudent;
	}

	public Set getAttendancesForAAttendanceman() {
		return this.attendancesForAAttendanceman;
	}

	public void setAttendancesForAAttendanceman(Set attendancesForAAttendanceman) {
		this.attendancesForAAttendanceman = attendancesForAAttendanceman;
	}

	public Set getMorals() {
		return this.morals;
	}

	public void setMorals(Set morals) {
		this.morals = morals;
	}

	public Set getAttendancesForACheckman() {
		return this.attendancesForACheckman;
	}

	public void setAttendancesForACheckman(Set attendancesForACheckman) {
		this.attendancesForACheckman = attendancesForACheckman;
	}

}