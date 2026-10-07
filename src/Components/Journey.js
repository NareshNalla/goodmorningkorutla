import React from "react";

function Journey() {
    const steps = [
        { date: "18 Oct 1976", title: "Born in Raghavapet", text: "Born in Raghavapet village, Mallapur mandal, Jagtial district — son of Kalvakuntla Vidya Sagar Rao, a three-time MLA." },
        { date: "1991 – 1993", title: "Education in Guntur", text: "Completed intermediate at Vignan College, Guntur — a hostel student from UKG, known for discipline and hard work." },
        { date: "1999", title: "MBBS Doctor", text: "Earned his MBBS from B.M. Patel Medical College, Bijapur — the start of his journey as a doctor." },
        { date: "2003", title: "Master of Surgery", text: "Completed MS in Orthopaedics at JSS Medical College, Mysuru, and went on to serve patients at Yashoda Hospitals, Hyderabad." },
        { date: "Doctor Years", title: "The People's Doctor", text: "As a spine and orthopaedic surgeon, he treated thousands — including former CM K. Chandrashekar Rao — and earned a name as a 'discount doctor' who never turned a poor patient away." },
        { date: "2009 – 2018", title: "A Family Legacy in Korutla", text: "His father, Kalvakuntla Vidya Sagar Rao, represented Korutla for three terms — the seat Sanjay would go on to inherit and serve." },
        { date: "21 Aug 2023", title: "Announced as BRS Candidate", text: "BRS President KCR announced Dr. Sanjay as the party's candidate for Korutla, succeeding his father." },
        { date: "3 Dec 2023", title: "Elected MLA of Korutla", text: "A sensational first-step victory: polled 72,115 votes and defeated his nearest rival by 10,305 votes to win the Korutla Assembly seat for BRS." },
        { date: "5 Dec 2023", title: "Took KCR's Blessings", text: "Days after the win, the newly elected MLA met BRS chief KCR at Erravelli and took his blessings." },
        { date: "9 Dec 2023", title: "Took Oath as MLA", text: "Sworn in as Member of the Telangana Legislative Assembly, promising to dedicate himself to Korutla's development and stand by every constituent." },
        { date: "Every Day", title: "Good Morning Korutla", text: "His signature daily program — walking the streets every morning, meeting families, listening to problems and solving them on the spot." },
    ];
    return (
        <section className="gmk-journey" id="journey">
            <div className="gmk-journey-inner">
                <h2 className="gmk-section-title"><span>—</span> Great Moments <span>—</span></h2>
                <div className="gmk-timeline">
                    {steps.map((s) => (
                        <div className="gmk-timeline-item" key={s.date + s.title}>
                            <div className="gmk-timeline-dot"></div>
                            <div className="gmk-timeline-content">
                                <p className="gmk-timeline-date">{s.date}</p>
                                <h4>{s.title}</h4>
                                <p>{s.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Journey;
