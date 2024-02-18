function Path(sx, sy) {
	this.vertices = [[sx, sy]];
	this.stroke = '#000';
	this.fill = 'none';
}

Path.prototype.toString = function() {
	let d = [];

	for (const i in this.vertices) {
		if (i == 0) {
			d.push('M');
		} else if (i === this.vertices.length-1) {
			d.push('Z');
		} else {
			d.push('L');
		}

		d.push(`${this.vertices[i][0]},${this.vertices[i][1]}`);
	}

	const props = Object.entries(this).map(prop => prop.join('=')).join(' ');

	return `<path d="${d.join(' ')}" ${props} />`;
}

Path.prototype.add = function(x, y) {
	this.vertices.push([x, y]);
}

export default Path;
