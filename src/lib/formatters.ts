export function lowerFormatter(value: string | null | undefined): string {
  if (!value) return 'none';
  if (value.match(/^[#0-9]\//)) {
    value = value.split('/')[1];
  }
  return value.toLowerCase();
}

export function fragmentFormatter(value: boolean | null | undefined): string {
  return value ? 'yes' : 'no';
}

export function titleFormatter(value: string | null | undefined): string {
  if (!value) return 'none';
  if (value.match(/^[#0-9]\//)) {
    value = value.split('/')[1];
  }
  if (value.includes('scp-')) {
    value = value.replace('scp-', 'SCP-');
  }
  return value;
}

export function linkFormatter(url: string | null | undefined, name: string | null | undefined): string {
  if (!url) return 'none';
  return name === 'SCP-000' ? `<a href='${url} target='_blank''>Unknown Name</a>` : `<a href='${url}' target='_blank'>${name}</a>`;
}

export function clearFormatter(value: string | null | undefined): string {
  const clearanceArray: string[] = ['1/ Unrestricted', '2/ Restricted', '3/ Confidential', '4/ Secret', '5/ Top-Secret', '6/ Cosmic Top-Secret'];  

  if (!value) return '0/ none';
  if (value.match(/^[#0-9]\//)) {
    value = value.split('/')[1];
  }
  if (value.match(/ [#0-9]$/)) {
    value = value.split(' ')[1];
  }

  const clearanceIndex: number = parseInt(value) - 1;
  if (clearanceIndex >= 0 && clearanceIndex < clearanceArray.length) {
    return clearanceArray[clearanceIndex];
  }
  return `?/ Unique: ${value}`;
}