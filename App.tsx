/** @jsxImportSource jotai-signal */

import { Text, View, StyleSheet, Button } from "react-native";
import { atom } from "jotai/vanilla";
import { useAtom, useSetAtom } from "jotai/react";
import { $, createElement } from "jotai-signal";

const countAtom = atom(0);

export default function App() {
	return (
		<View style={styles.container}>
			<Text style={styles.paragraph}>React Native Example</Text>
			<View>
				<Controls />
				<Counter />
				<CounterWithHandCompiledSignal />
				<CounterWithSignal />
			</View>
		</View>
	);
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
				")"
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

function Controls() {
	const setCount = useSetAtom(countAtom);
	return (
		<View>
			<Button onPress={() => setCount((c) => c + 1)} title="increment" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#ecf0f1",
		padding: 8
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center"
	},
	p: {
		margin: 24,
		fontSize: 14,
		fontWeight: "bold",
		textAlign: "center"
	},
	h1: {
		margin: 24,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center"
	}
});
