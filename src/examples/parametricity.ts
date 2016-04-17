class Html<A> {
	content: A
}

function id<A>(a : A): A {
	return a;
}

function setContent<content, newC>(f: (c: content) => newC, x: Html<content>) : Html<newC> {
	return { content: f(x.content)}
}
console.log(setContent((x) => x+1, {content: 42}).content)
