﻿	    class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	rotate(theta) {
		var x = this.x;
		var y = this.y;
		this.x = Math.cos(theta) * x - Math.sin(theta) * y;
		this.y = Math.sin(theta) * x + Math.cos(theta) * y;
		return this;
	}
	mult(f) {
		this.x *= f;
		this.y *= f;
		return this;
	}
	clone() {
		return new Vector(this.x, this.y);
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	subtract(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}
	set(x, y) {
		this.x = x;
		this.y = y;
		return this;
	}
};
		
		
	    class Petal {
	constructor(stretchA, stretchB, startAngle, angle, growFactor, bloom) {
		this.stretchA = stretchA;
		this.stretchB = stretchB;
		this.startAngle = startAngle;
		this.angle = angle;
		this.bloom = bloom;
		this.growFactor = growFactor;
		this.r = 1;
		this.isfinished = false;
		//this.tanAngleA = Garden.random(-Garden.degrad(Garden.options.tanAngle), Garden.degrad(Garden.options.tanAngle));
		//this.tanAngleB = Garden.random(-Garden.degrad(Garden.options.tanAngle), Garden.degrad(Garden.options.tanAngle));
	}
	draw() {
		var ctx = this.bloom.garden.ctx;
		var v1, v2, v3, v4;
		v1 = new Vector(0, this.r).rotate(Garden.degrad(this.startAngle));
		v2 = v1.clone().rotate(Garden.degrad(this.angle));
		v3 = v1.clone().mult(this.stretchA); //.rotate(this.tanAngleA);
		v4 = v2.clone().mult(this.stretchB); //.rotate(this.tanAngleB);
		ctx.strokeStyle = this.bloom.c;
		ctx.beginPath();
		ctx.moveTo(v1.x, v1.y);
		ctx.bezierCurveTo(v3.x, v3.y, v4.x, v4.y, v2.x, v2.y);
		ctx.stroke();
	}
	render() {
		if (this.r <= this.bloom.r) {
			this.r += this.growFactor; // / 10;
			this.draw();
		} else {
			this.isfinished = true;
		}
	}
}

	    class Bloom {
	constructor(p, r, c, pc, garden) {
		this.p = p;
		this.r = r;
		this.c = c;
		this.pc = pc;
		this.petals = [];
		this.garden = garden;
		this.init();
		this.garden.addBloom(this);
	}
	draw() {
		var p, isfinished = true;
		this.garden.ctx.save();
		this.garden.ctx.translate(this.p.x, this.p.y);
		for (var i = 0; i < this.petals.length; i++) {
			p = this.petals[i];
			p.render();
			isfinished *= p.isfinished;
		}
		this.garden.ctx.restore();
		if (isfinished == true) {
			this.garden.removeBloom(this);
		}
	}
	init() {
		var angle = 360 / this.pc;
		var startAngle = Garden.randomInt(0, 90);
		for (var i = 0; i < this.pc; i++) {
			this.petals.push(new Petal(Garden.random(Garden.options.petalStretch.min, Garden.options.petalStretch.max), Garden.random(Garden.options.petalStretch.min, Garden.options.petalStretch.max), startAngle + i * angle, angle, Garden.random(Garden.options.growFactor.min, Garden.options.growFactor.max), this));
		}
	}
}

	    class Garden {
	constructor(ctx, element) {
		this.blooms = [];
		this.element = element;
		this.ctx = ctx;
	}
	render() {
		for (var i = 0; i < this.blooms.length; i++) {
			this.blooms[i].draw();
		}
	}
	addBloom(b) {
		this.blooms.push(b);
	}
	removeBloom(b) {
		var bloom;
		for (var i = 0; i < this.blooms.length; i++) {
			bloom = this.blooms[i];
			if (bloom === b) {
				this.blooms.splice(i, 1);
				return this;
			}
		}
	}
	createRandomBloom(x, y) {
		this.createBloom(x, y, Garden.randomInt(Garden.options.bloomRadius.min, Garden.options.bloomRadius.max), Garden.randomrgba(Garden.options.color.rmin, Garden.options.color.rmax, Garden.options.color.gmin, Garden.options.color.gmax, Garden.options.color.bmin, Garden.options.color.bmax, Garden.options.color.opacity), Garden.randomInt(Garden.options.petalCount.min, Garden.options.petalCount.max));
	}
	createBloom(x, y, r, c, pc) {
		new Bloom(new Vector(x, y), r, c, pc, this);
	}
	clear() {
		this.blooms = [];
		this.ctx.clearRect(0, 0, this.element.width, this.element.height);
	}
	static random(min, max) {
		return Math.random() * (max - min) + min;
	}
	static randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	static degrad(angle) {
		return Garden.circle / 360 * angle;
	}
	static raddeg(angle) {
		return angle / Garden.circle * 360;
	}
	static rgba(r, g, b, a) {
		return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
	}
	static randomrgba(rmin, rmax, gmin, gmax, bmin, bmax, a) {
		var r = Math.round(Garden.random(rmin, rmax));
		var g = Math.round(Garden.random(gmin, gmax));
		var b = Math.round(Garden.random(bmin, bmax));
		var limit = 5;
		if (Math.abs(r - g) <= limit && Math.abs(g - b) <= limit && Math.abs(b - r) <= limit) {
			return Garden.rgba(rmin, rmax, gmin, gmax, bmin, bmax, a);
		} else {
			return Garden.rgba(r, g, b, a);
		}
	}
}

	    Garden.options = {
	        petalCount: {
	            min: 8,
	            max: 15
	        },
	        petalStretch: {
	            min: 0.1,
	            max: 3
	        },
	        growFactor: {
	            min: 0.1,
	            max: 1
	        },
	        bloomRadius: {
	            min: 8,
	            max: 10
	        },
	        density: 10,
	        growSpeed: 1000 / 60,
	        color: {
				rmin: 128,
				rmax: 255,
				gmin: 0,
				gmax: 128,
				bmin: 0,
				bmax: 128,
	            opacity: 0.1
	        },
	        tanAngle: 60
	    };
	    Garden.circle = 2 * Math.PI;
