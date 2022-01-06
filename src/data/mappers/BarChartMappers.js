import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

const getMetric = (id, arrMetrics) => {
  const obj = arrMetrics.find(d => d.id === id);
  return obj ? obj.metric : NaN;
};

const ivaoFilghtsByPilot = (metrics, reference = [], metricName) => {
  if (!metrics) {
     return [];
  }
  return reference.map((d) => {
    const c = metrics.find(m => d.x === m.name);
    const y = c ? getMetric(metricName, c.metrics) : 0;
    return { x: d.x, y };
  });
}

export const flightsByDayMapper = (result) => {
  const labels = ['labels.ivaoFlights', 'labels.flights'];
  const allByPilot = get(result, 'flightsByDay', []);
  const ivaoByPilot = ivaoFilghtsByPilot(get(result, 'ivaoMetrics.byDay', []), cloneDeep(allByPilot), 'total_flights');
  const onlyAcars = allByPilot.map((d, i) => ({
    x: d.x,
    y: d.y - ivaoByPilot[i].y,
  }));
  
  const data = [
    ivaoByPilot,
    onlyAcars,
  ];
  return labels.map((label, i) => ({
    label,
    series: data[i],
  }));
}

export const flightsByPilotMapper = (result) => {
  const labels = ['labels.ivaoFlights', 'labels.flights'];
  const allByPilot = get(result, 'flightsByPilot', []);
  const ivaoByPilot = ivaoFilghtsByPilot(get(result, 'ivaoMetrics.byPilot', []), cloneDeep(allByPilot), 'total_flights');
  const onlyAcars = allByPilot.map((d, i) => ({
    x: d.x,
    y: d.y - ivaoByPilot[i].y,
  }));
  
  const data = [
    ivaoByPilot,
    onlyAcars,
  ];
  return labels.map((label, i) => ({
    label,
    series: data[i],
  }));
}

export const timeByPilotMapper = (result) => {
  const labels = ['labels.ivaoFlights', 'labels.flights'];
  const allByPilot = get(result, 'timeByPilot', []);
  const ivaoByPilot = ivaoFilghtsByPilot(get(result, 'ivaoMetrics.byPilot', []), result.flightsByPilot, 'total_time');
  let orderedIvao = [];
  const onlyAcars = allByPilot.map((d) => {
    const ivao = ivaoByPilot.find(e => e.x === d.x);
    orderedIvao.push(ivao);
    return {
      x: d.x,
      y: d.y - (ivao ? ivao.y : 0),
    };
  });
  
  const data = [
    minutesArrayToHour(orderedIvao),
    minutesArrayToHour(onlyAcars),
  ];
  return labels.map((label, i) => ({
    label,
    series: data[i],
  }));
}

const minutesArrayToHour = (arr) => {
  return arr.map(d => ({
    x: d.x,
    y: (d.y / 60).toFixed(2)
  }));
}

export const timeByDayMapper = (result) => {
  const labels = ['labels.ivaoFlights', 'labels.flights'];
  const allByDay = get(result, 'timeByDay', []);
  const ivaoByDay = ivaoFilghtsByPilot(get(result, 'ivaoMetrics.byDay', []), cloneDeep(allByDay), 'total_time');
  
  const onlyAcars = allByDay.map((d, i) => ({
    x: d.x,
    y: d.y - ivaoByDay[i].y,
  }));
  
  const data = [
    minutesArrayToHour(ivaoByDay),
    minutesArrayToHour(onlyAcars),
  ];
  return labels.map((label, i) => ({
    label,
    series: data[i],
  }));
}