package com.xsh.domain;

import java.util.HashSet;
import java.util.Set;

/**
 * ScoreRule entity. @author MyEclipse Persistence Tools
 */

public class ScoreRule implements java.io.Serializable {

	// Fields

	private Integer id;
	private String reason;
	private Short type;
	private Float score;
	private Set attendances = new HashSet(0);

	// Constructors

	/** default constructor */
	public ScoreRule() {
	}

	/** minimal constructor */
	public ScoreRule(String reason, Short type, Float score) {
		this.reason = reason;
		this.type = type;
		this.score = score;
	}

	/** full constructor */
	public ScoreRule(String reason, Short type, Float score, Set attendances) {
		this.reason = reason;
		this.type = type;
		this.score = score;
		this.attendances = attendances;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getReason() {
		return this.reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public Short getType() {
		return this.type;
	}

	public void setType(Short type) {
		this.type = type;
	}

	public Float getScore() {
		return this.score;
	}

	public void setScore(Float score) {
		this.score = score;
	}

	public Set getAttendances() {
		return this.attendances;
	}

	public void setAttendances(Set attendances) {
		this.attendances = attendances;
	}

}