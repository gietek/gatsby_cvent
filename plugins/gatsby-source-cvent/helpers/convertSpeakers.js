const getAttributes = require('./getAttributes');
const {
  SPEAKER_ATTRIBUTES,
} = require('../consts');

const addSpeakerToSession = (sessions, id, speaker) => {
  if (typeof sessions[id] === 'undefined') {
    sessions[id] = [];
  }
  sessions[id].push(speaker);

  return sessions;
}

const convertSpeakers = (list) => {
  let sessions = {};

  list.forEach(speaker => {
    const speakerAttributes = getAttributes(speaker, SPEAKER_ATTRIBUTES);

    if (!speaker.AssignedSessions) {
      // ignore speakers without sessions assigned
      return null;
    }

    if (Array.isArray(speaker.AssignedSessions)) {
      speaker.AssignedSessions.forEach(session => {
        const sessionId = session._attributes.SessionId;
        sessions = addSpeakerToSession(sessions, sessionId, speakerAttributes);
      });
    } else {
      const sessionId = speaker.AssignedSessions._attributes.SessionId;
      sessions = addSpeakerToSession(sessions, sessionId, speakerAttributes);
    }
  });

  return sessions;
};

module.exports = convertSpeakers;
