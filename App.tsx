/** @jsxImportSource jotai-signal */

/**
 * added necessary config
 * in order to work with jsxImportSource
 * @see metro.config.js
 */

import { Button, StyleSheet, Text, View } from "react-native";
import { atom } from "jotai/vanilla";
import { useAtom, useSetAtom } from "jotai/react";
import { $, atomSignal, createElement } from "jotai-signal";
import { ReactElement, ReactNode } from "react";

const countAtom = atom(0);
const showAtom = atom(true);
const countAtomSignal = atomSignal(0);
const doubled = atomSignal((get) => get(countAtomSignal) * 2);

export default function App() {
	return (
		<View style={styles.container}>
			<Text style={styles.paragraph}>React Native Example</Text>
			<View>
				<Controls />
				<Show
					show={$(showAtom)}
					fallback={
						<View>
							<Text>Hidden!</Text>
						</View>
					}
				>
					<Counter />
					<CounterWithHandCompiledSignal />
					<CounterWithSignal />
					<CounterAtomSignal />
				</Show>
			</View>
		</View>
	);
}

function Show({
	show,
	fallback,
	children,
}: {
	show: boolean;
	fallback: ReactNode;
	children: ReactNode;
}) {
	if (show) {
		return children as ReactElement;
	}
	return fallback as ReactElement;
}

function Counter() {
	const [count] = useAtom(countAtom);
	return (
		<View>
			<Text style={styles.h1}>With useAtom(atom)</Text>

			<Text style={styles.p}>
				Count: {count} ({Math.random()})
			</Text>
		</View>
	);
}

function CounterWithHandCompiledSignal() {
	return (
		<View>
			<Text style={styles.h1}>With createElement($(atom))</Text>

			{createElement(
				Text,
				{ style: styles.p },
				"Count: ",
				$(countAtom),
				" (",
				Math.random(),
				")",
			)}
		</View>
	);
}

function CounterWithSignal() {
	return (
		<View>
			<Text style={styles.h1}>With $(atom)</Text>
			<Text style={styles.p}>
				Count: {$(countAtom)} ({Math.random()})
			</Text>
		</View>
	);
}

function CounterAtomSignal() {
	/**
	 * @see https://twitter.com/dai_shi/status/1629469352872517633
	 */
	return (
		<View>
			<Text style={styles.h1}>AtomSignal $(atom)</Text>
			<Text style={styles.p}>
				Count: {countAtomSignal} ({Math.random()})
			</Text>
			<Text style={styles.p}>
				Doubled: {doubled}
			</Text>
		</View>
	);
}

function Controls() {
	const setCount = useSetAtom(countAtom);
	const [show, setShow] = useAtom(showAtom);
	const setAtomSignalCount = useSetAtom(countAtomSignal);
	return (
		<View style={styles.controls}>
			<Button
				onPress={() => {
					setCount((c) => c + 1);
					setAtomSignalCount((c) => c + 1);
				}}
				title="increment"
			/>
			<Button
				onPress={() => setShow((x) => !x)}
				title={show ? "Hide" : "Show"}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	controls: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#ecf0f1",
		padding: 8,
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
	p: {
		margin: 24,
		fontSize: 14,
		fontWeight: "bold",
		textAlign: "center",
	},
	h1: {
		margin: 24,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
});
