// Припускаємо, що дата виглядає як: const data = { conference, tracks, speakers, talks };

/**
 * Знаходить доповідь за її ID та додає до неї повні об'єкти спікера та треку
 */
export function getFullTalkDetails(talkId, data) {
    const talk = data.talks.find(t => t.id === talkId);
    if (!talk) return null;

    // Знаходимо спікера, який прив'язаний до цієї доповіді
    // (Або через talk.speakerId, або якщо їх кілька: data.speakers.filter(...))
    const speaker = data.speakers.find(s => s.id === talk.speakerId);

    // Знаходимо трек доповіді
    const track = data.tracks.find(t => t.id === talk.trackId);

    // Повертаємо новий «зшитий» об'єкт
    return {
        ...talk,
        speaker: speaker || null,
        track: track || null
    };
}

/**
 * Знаходить спікера за ID та додає до нього всі його доповіді та їхні треки
 */
export function getFullSpeakerDetails(speakerId, data) {
    const speaker = data.speakers.find(s => s.id === speakerId);
    if (!speaker) return null;

    // Знаходимо всі доповіді цього спікера
    const speakerTalks = data.talks
        .filter(talk => talk.speakerId === speakerId)
        .map(talk => ({
            ...talk,
            track: data.tracks.find(t => t.id === talk.trackId) || null
        }));

    return {
        ...speaker,
        talks: speakerTalks
    };
}
