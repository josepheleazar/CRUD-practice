export default function genID(data) {
  data.sort((a, b) => {
    return a.id - b.id;
  })
  for(var i = 1; i <= data.length; i++) {
    if(i < data[i - 1].id) {
      if(i !== data[i - 1].id) {
        return i;
      }
    } else {
      return data.length + 1;
    }
  }
}