const Discord = require("discord.js");
const util = require('../util.js');
const Canvas = require('canvas');
module.exports.run = async (bot, message, args) =>{
	message.delete();
	if(message.channel.id != '702962295998906398'){return}
	let kitisgay = message.member;
	let array = [ kitisgay.id ]
	const canvas = Canvas.createCanvas(100, 30);
	const ctx = canvas.getContext('2d');
	const blankbg = await Canvas.loadImage('./images/blankbg.jpg');
	ctx.drawImage(blankbg, 0, 0, canvas.width, canvas.height);
	ctx.font = '24px "Microsoft YaHei"';

	let drawText = (text, x) => {
		ctx.save();
		const angle = Math.random() / 10;
		const y = 22;
		ctx.rotate(angle);
		ctx.fillText(text, x, y);
		ctx.restore();
	}

	let drawLine = () => {
		const num = Math.floor(Math.random() * 2 + 3);

		for(let i = 0; i < num; i++){
		const color = '#' + (Math.random() * 0xffffff << 0).toString(16);
		const y1 = Math.random() * canvas.height;
		const y2 = Math.random() * canvas.height;
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.lineTo(0, y1);
		ctx.lineTo(canvas.width, y2);
		ctx.stroke();
		}
	}

	const numArr = [
	'〇一二三四五六七八九',
	'0123456789',
	'零壹貳叁肆伍陸柒捌玖'
	];

	const fir = Math.floor(Math.random() * 10);
	const sec = Math.floor(Math.random() * 10);
	const operArr = ['加', '減', '乘'];
	const oper = Math.floor(Math.random() * operArr.length);

	drawLine();
	drawText(numArr[Math.floor(Math.random() * numArr.length)][fir], 10);
	drawText(operArr[oper], 40);
	drawText(numArr[Math.floor(Math.random() * numArr.length)][sec], 70);
	drawText('=', 100);
	drawText('?', 130);

	let captcha;
	switch(oper) {
	  case 0: 
		captcha = fir + sec;
		break;
	  case 1:
		captcha = fir - sec;
		break;
	  case 2:
		captcha = fir * sec;
		break;
	}
	const attachment = new Discord.Attachment(canvas.toBuffer(), '測謊機.png');
	message.channel.send(`${kitisgay}, 請在十秒內輸入算式答案以獲得**一般成員**權限!`, attachment).then(message => {
		message.delete(10000).catch(console.log(error))
	});
	try {
		const filter = m => m.content > captcha - 1 && m.content < captcha + 1 && array.includes(m.author.id);
		var response = await message.channel.awaitMessages(filter, {
			maxMatches: 1,
			time: 10000,
			errors: ['time']
		});
		const fetched = await message.channel.fetchMessages({limit: 1});
		message.channel.bulkDelete(fetched)
	} catch (err) {
		let png = canvas.createPNGStream();
		const embed = new Discord.RichEmbed()
		embed
		.setAuthor(message.author.tag, message.author.avatarURL)
		.setDescription(`${kitisgay} 驗證碼錯誤 / 超過輸入時間!`)
		.setColor(0xcc0000)
		.setTitle('ReiNa Bot 驗證錯誤')
		.setURL("https://mcwind.tk")
		.attachFile(new Discord.Attachment(png, 'Q.png'))
		.setImage("attachment://Q.png")
		.setTimestamp()
		.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
		message.channel.send(embed).then(message => {
			message.delete(5000).catch(console.log(error));
		});
		return;
		}
	let embed = new Discord.RichEmbed()
	embed
	.setAuthor(message.author.tag, message.author.avatarURL)
	.setDescription(`${kitisgay}` + "通過驗證!")
	.setColor(0xcc0000)
	.setTitle('ReiNa Bot')
	.setURL("https://mcwind.tk")
	.setTimestamp()
	.setFooter('ReiNa By 𝓖𝓻𝓪𝓷𝓭𝓞𝓹𝓮𝓻𝓪𝓽𝓸𝓻#9487', bot.user.avatarURL);
	await message.member.addRole('702950415045754880');
	await message.member.removeRole('702950614195241053');
	await message.channel.send(embed).then(message => {
		message.delete(1500).catch(console.log(error));
	});
	return;
}

module.exports.help = {
	name: "驗證",
	description: "驗證以獲得**一般成員**權限",
	cate: 8,
	show: false
	
}
