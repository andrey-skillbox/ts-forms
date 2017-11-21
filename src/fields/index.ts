import { Observable } from 'rxjs/Observable';
import { iMessage } from '../message';

type TypeField = 'checkbox' | 'text' | 'select' | 'file' | 'img' | 'textarea' | 'info' | 'password';

export interface iField {
  label: string,
  type: TypeField,
  required: boolean,
  options?: string[],
  multiple?: boolean,
  val: any;
  message?: iMessage,
  name: string,
}

class StringField implements iField {
	
	public name: string;
	public label: string;
	public val: string;
	public type: TypeField;
	public required: boolean;
  public message;

	constructor(name: string, label: string, val: string = '', required: boolean = true, type?: TypeField,) {
	  this.name = name;
	  this.label = label;
	  this.val = val;
    if (type){
      this.type = type;
    }
	  this.required = required;
	}
}

export class TextField extends StringField {
	
  public readonly type: 'text' = 'text';
}

export class InfoField extends StringField {
	
  public readonly type: 'info' = 'info';
}

export class PasswordField extends StringField {
	
  public readonly type: 'password' = 'password';
}

export class TextareaField extends StringField {

  public readonly type: 'textarea' = 'textarea';
}

class UrlField implements iField {

  public name: string;
  public label: string;
  public val: string[];
  public readonly type: TypeField;
  public multiple: boolean;
  public required: boolean;
  public message;

  constructor(name: string, label: string, val: string[] = [], type: TypeField, required: boolean, multiple: boolean = false) {
	this.name = name;
	this.label = label;
	this.val = val;
	this.type = type;
	this.multiple = multiple;
	this.required = required;
  }
}

export class ImageField extends UrlField {

  public type: 'img' = 'img';
}

export class FileField extends UrlField {

  public type: 'file' = 'file';
}

export class SelectField implements iField {

  public name: string;
  public label: string;
  public val: any[];
  public readonly type: 'select';
  public multiple: boolean;
  public options: any[];
  public required: boolean;
  public message;

  constructor(name: string, label: string, val: string[] = [], required: boolean,
  	          type: TypeField, multiple: boolean = false, options: Observable<any[]>) {
	this.name = name;
	this.label = label;
	this.val = val;
	this.type = 'select';
	this.multiple = multiple;
	this.required = required;
	options.subscribe((a) => this.options = a);
  }
}

export class BooleanField implements iField {

  public name: string;
  public label: string;
  public val: boolean;
  public readonly type: 'checkbox';
  public required: boolean;
  public message;

  constructor(name: string, label: string, val: boolean = false, type: TypeField, required: boolean,) {
	this.name = name;
	this.label = label;
	this.val = val;
	this.type = 'checkbox';
	this.required = required;
  }
}

export type Field = BooleanField | SelectField | ImageField | FileField | TextField | InfoField | PasswordField | TextareaField;