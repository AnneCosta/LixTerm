import React from "react";
import { LixTerminal } from "../../components/LixTerminal";
import { AsciiRobot } from "../../components/AsciiRobot";

export function Home() {
	return (
		<div className="w-full p-5">

			<article className="flex relative inset-y-96">
				<section className="flex-none">
					<AsciiRobot />
				</section>

				<section className="flex-1">
					<p className="">teste</p>
				</section>
			</article>
			
			<article className="">
				<section className="absolute inset-x-0 bottom-0 p-5">
					<LixTerminal name="teste" />
				</section>
			</article>
		</div>
	)
}