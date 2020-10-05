/**
 * MultiBytaTag.js
 * @author mafumafuultu
 * @version 20201005
 * @license MIT
 */
const tag_to_link = (tag, base) => {
	const el = document.createElement(`a`);
	el.href = `${base}?tag=${tag.link}`;
	el.textContent = tag.txt;
	el.classList.toggle('tagitem', true);
	return el.outerHTML;
};
const to_tag_item = txt => txt.replace(/(\r\n|\r|\n)/g, ' $1 ');
const to_tag_token = txt => txt.split(/[\u0020\u3000\t]+/mgi);
const get_tag_list = tokens => tokens.filter(v => v.lastIndexOf('#') == 0 && 1 < v.length);
const to_tag_link = t => [...t].map(v => v.codePointAt()).join('.');
const to_tag_map = tags => tags.reduce((m, v) => (m.set(v, {txt: v, link: to_tag_link(v)}) ,m), new Map());
const parse_token = (tagmap, base) => token => tagmap.has(token) ? tag_to_link(tagmap.get(token), base) : token;
class MultiByteTag {
	static toHtml (txt='', base='/') {
		const t = to_tag_item(txt);
		const token = to_tag_token(t);
		const tagmap = to_tag_map(get_tag_list(token));
		return token.map(parse_token(tagmap, base)).join(' ').replace(/\s{0,}(\r\n|\r|\n)\s{0,}/g, '<br>');
	}
	static parse (txt='') {return String.fromCodePoint(...txt.split('.'));}
}