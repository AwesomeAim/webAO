import transparentPng from '../constants/transparentPng';
import fileExists from '../utils/fileExists';

/**
	 * Sets all the img tags to the right sources
	 * @param {*} chatmsg
	 */

const setEmote = async (AO_HOST, client, charactername, emotename, prefix, pair, side) => {
  const pairID = pair ? 'pair' : 'char';
  const characterFolder = `${AO_HOST}characters/`;
  const acceptedPositions = ['def', 'pro', 'wit'];
  const position = acceptedPositions.includes(side) ? `${side}_` : '';
  const emoteSelector = document.getElementById(`client_${position}${pairID}_img`)
  const extensionsMap = [
    '.gif',
    '.png',
    '.apng',
    '.webp'
  ];

  for (const extension of extensionsMap) {
    // Hides all sprites before creating a new sprite
    if (client.lastChar !== client.chatmsg.name) {
      emoteSelector.src = transparentPng;
    }
    let url;
    if (extension === '.png') {
      url = `${characterFolder}${encodeURI(charactername)}/${encodeURI(emotename)}${extension}`;
    } else {
      url = `${characterFolder}${encodeURI(charactername)}/${encodeURI(prefix)}${encodeURI(emotename)}${extension}`;
    }
    const exists = await fileExists(url);
    if (exists) {
      emoteSelector.src = url;
      break;
    }
  }
};
export default setEmote;
