import React from "react";
import {pSBC} from "./../../pSBC";
import styles from "./index.module.scss";


export type BarDirection = "positive" | "negative" | "neutral";

interface MyProps{
	className?: string;
	contribution: number;
	maxContribution: number;
	label: string;
	framing?: BarDirection;
	sign?: number;
	selected: boolean;
	colors: string[];
}

interface MyState{

}

export default class Bar extends React.Component<MyProps, MyState> {
	public static defaultProps = {
		className: "",
		framing: "neutral",
		sign: 1
	}


	constructor(p){
		super(p);
	}

	public render() {
		let styleLeft = styles.neutral;
		let styleRight = styles.neutral;
		let colorLeft = this.props.colors[1];
		let colorRight = this.props.colors[1];
		switch(this.props.framing){
			case "positive":
				styleLeft = this.props.sign==1?styles.negative:styles.positive;
				styleRight = this.props.sign==-1?styles.negative:styles.positive;
				colorLeft = this.props.sign==1?this.props.colors[2]:this.props.colors[0];
				colorRight = this.props.sign==-1?this.props.colors[2]:this.props.colors[0];
				break;
			case "negative":
				styleLeft = this.props.sign==-1?styles.negative:styles.positive;
				styleRight = this.props.sign==1?styles.negative:styles.positive;
				colorLeft = this.props.sign==-1?this.props.colors[2]:this.props.colors[0];
				colorRight = this.props.sign==1?this.props.colors[2]:this.props.colors[0];
				break;
		}

		return (<div className={[styles.root, this.props.className].join(' ')}>
			{this.width() < 25 &&
			<div className={[styles.contentOutside, styles.content, this.props.selected?styles.selected:null].join(' ')} style={{width: `${50-this.width()}%`, visibility: (this.props.sign==-1?"visible":"hidden")}}>{this.text()}</div>}
			<div className={[styles.left, styleLeft].join(' ')} style={{width: `${this.width()}%`, visibility: (this.props.sign==-1?"visible":"hidden"), backgroundColor: colorLeft, borderColor: pSBC(-0.3, colorLeft)}} title={this.text()}>{this.content()}</div>
			<div className={styles.center}>&nbsp;</div>
			<div className={[styles.right, styleRight].join(' ')} style={{width: `${this.width()}%`, visibility: (this.props.sign==1?"visible":"hidden"), backgroundColor: colorRight, borderColor: pSBC(-0.3, colorRight)}} title={this.text()}>{this.content()}</div>
			{this.width() < 25 &&
			<div className={[styles.contentOutside, styles.content, this.props.selected?styles.selected:null].join(' ')} style={{width: `${50-this.width()}%`, visibility: (this.props.sign==1?"visible":"hidden")}}>{this.text()}</div>}
		</div>);
	}

	private content(){
		if (this.width() >= 25){
			return <div className={[styles.content, this.props.selected?styles.selected:null].join(' ')}>{this.text()}</div>;
		}
		return ` `;
	}

	private text(): string{
		let r = '';

		// add sign
		switch(this.props.sign){
			default:
			case 1: r+="+"; break;
			case -1: r+="-"; break;
		}

		// add contribution as percentage
		r += `${(Math.abs(this.props.contribution)*100).toFixed(2)}% `;

		// add label
		r += this.props.label;

		return r;
	}

	private width(): number{
		return (this.props.contribution/this.props.maxContribution) * 50;
	}
}