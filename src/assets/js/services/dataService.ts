import type { ConferenceData, Track, Speaker, Talk } from '../api/fetchData.js';

export interface TalkWithDetails extends Talk {
    speaker: Speaker;
    track: Track;
}

export interface TalkWithTrack extends Talk {
    track: Track;
}

export interface SpeakerWithTalks extends Speaker {
    talks: TalkWithTrack[];
}

/**
 * Знаходить доповідь за її ID та додає до неї повні об'єкти спікера та треку
 */
export function getFullTalkDetails(
    talkId: string,
    data: ConferenceData
): TalkWithDetails {
    const talk = data.talks.find(t => t.id === talkId);

    if (!talk) throw new Error(`Talk with ID ${talkId} not found`);

    // Знаходимо спікера, який прив'язаний до цієї доповіді
    const speaker = findSpeaker(talk.speakerId, data);

    // Знаходимо трек доповіді
    const track = findTrack(talk.trackId, data);

    // Повертаємо новий «зшитий» об'єкт
    return {
        ...talk,
        speaker,
        track
    };
}

/**
 * Знаходить спікера за ID та додає до нього всі його доповіді та їхні треки
 */
export function getFullSpeakerDetails(
    speakerId: string,
    data: ConferenceData
): SpeakerWithTalks {
    const speaker = findSpeaker(speakerId, data);

    // Знаходимо всі доповіді цього спікера
    const speakerTalks = data.talks
        .filter(talk => talk.speakerId === speakerId)
        .map(talk => ({
            ...talk,
            track: findTrack(talk.trackId, data)
        }));

    return {
        ...speaker,
        talks: speakerTalks
    };
}

function findSpeaker(speakerId: string, data: ConferenceData): Speaker {
    const speaker = data.speakers.find(s => s.id === speakerId);

    if (!speaker) {
        throw new Error(`Speaker with ID ${speakerId} not found`)
    }

    return speaker;
}

function findTrack(trackId: string, data: ConferenceData): Track {
    const track = data.tracks.find(t => t.id === trackId);

    if (!track) {
        throw new Error(`Track with ID ${trackId} not found`)
    }

    return track;
}