const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { createEvents } = require('ics'); // Correctly import the ics module

function parseDateTime(dateTimeString) {
    // Parse "YYYY-MM-DD HH:MM" into [YYYY, MM, DD, HH, MM]
    const dateTimeParts = dateTimeString.split(' ');
    const dateParts = dateTimeParts[0].split('-').map(Number); // [YYYY, MM, DD]
    const timeParts = dateTimeParts[1] ? dateTimeParts[1].split(':').map(Number) : [0, 0]; // [HH, MM] or default to [0, 0]

    if (
        dateParts.length === 3 &&
        timeParts.length === 2 &&
        !isNaN(dateParts[0]) &&
        !isNaN(dateParts[1]) &&
        !isNaN(dateParts[2]) &&
        !isNaN(timeParts[0]) &&
        !isNaN(timeParts[1])
    ) {
        return [...dateParts, ...timeParts]; // [YYYY, MM, DD, HH, MM]
    } else {
        console.warn(`Invalid date-time format: ${dateTimeString}`);
        return null; // Return null for invalid date-time
    }
}

async function loadEvents() {
    const yamlText = fs.readFileSync('docs/calendar/events.yaml', 'utf8');
    const events = yaml.load(yamlText);

    if (!Array.isArray(events)) {
        throw new Error('Parsed YAML is not an array');
    }

    return events
        .map(event => {
            const start = parseDateTime(event.start);
            const end = parseDateTime(event.end);

            if (!start || !end) {
                console.warn(`Skipping event with invalid dates: ${JSON.stringify(event)}`);
                return null; // Skip invalid events
            }

            return {
                start,
                end,
                title: event.title,
                description: event.description || '',
                location: event.location || ''
            };
        })
        .filter(event => event !== null); // Filter out invalid events
}

function generateICal(events) {
    const { value, error } = createEvents(
        events.map(event => ({
            start: event.start,
            end: event.end,
            title: event.title,
            description: event.description,
            location: event.location
        }))
    );

    if (error) {
        console.error('Detailed Error Information:', error); // Log full error details
        throw new Error(`Error generating iCal file: ${JSON.stringify(error, null, 2)}`);
    }

    return value;
}

(async () => {
    try {
        const events = await loadEvents();
        console.log('Loaded events:', events); // Log loaded events for debugging
        const icalContent = generateICal(events);

        const outputPath = path.join('docs/calendar/digital_work_cal.ical');
        fs.writeFileSync(outputPath, icalContent, 'utf8');
        console.log('iCal file generated and saved to:', outputPath);
    } catch (error) {
        console.error('Error during iCal generation:', error);
        process.exit(1); // Exit with error
    }
})();
