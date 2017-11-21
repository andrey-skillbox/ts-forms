import { Field } from './fields';
import { iMessage, MessageType } from './message';


interface DataForm {
  children: DataForm;
}

export interface iForm {
  readonly message: iMessage; // Получить сообшение об ошибке или undefined
  children: iForm[]; // Список дочерних форм
  set_data(): DataForm; // Получение данных при отправке формы
  change_fields(): void; // Открытие/закрытие доп полей
  get_fields(): Field[]; // Получить список видимых полей
  close_message(): void; // Удалить сообщение об ошибке
  open_message(text: string, status: MessageType, timer?: number): void; // Сообщить об ошибке
}

class Form implements iForm {

	private fields: Field[];
	private extra_fields: Field[];
	public message: iMessage;
	public children: Form[];
	public get_fields = () => this.fields;
	
	constructor(fields: Field[] = [], children: Form[] = [], extra_fields: Field[] = [],) {
	  this.children = children;
	  this.fields = fields;
	  this.extra_fields = extra_fields;
	}

	public set_data(): DataForm {
	  let main_obj = this.get_fields().reduce((acc: Object, field: Field) => {
	  	let new_data = {};
	  	new_data[field.name] = field.val;
	  	return Object.assign(acc, new_data);
	  }, {});

	  main_obj['children'] = [];

	  return this.children.reduce((acc: Object, child: Form) => acc['childern'].push(child.set_data()), main_obj);
	}

	public change_fields(): void {
	  JSON.stringify(this.get_fields()) === JSON.stringify(this.fields) ? this.close_field() : this.open_fields();
	}

	public open_message(text: string, status: MessageType, timer: number = undefined): void {
	  this.message = {text: text, status: status};
	  if (timer) {
	  	setTimeout(this.close_message(), timer);
	  }
	}

	public close_message(): void {
	  this.message = undefined;	
	}

	private open_fields(): void {
	  this.get_fields = () => this.fields.concat(this.extra_fields);
	}

	private close_field(): void {
	  this.get_fields = () => this.fields;
	}
}