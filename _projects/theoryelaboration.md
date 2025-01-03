---
layout: default
title: theoryelaboration
title_long: ""
parent: 25 Projects
grand_parent: Research
area: knowledge_synthesis
started: 2018-01-15
resources:
  - name: dropbox
    link: https://www.dropbox.com/home/Theory%20elaboration
  - name: manuscript
    link: https://github.com/digital-work-lab/theory-elaboration-manuscript
  - name: analysis
    link: https://github.com/digital-work-lab/lrs-theory-impact
  - name: analysis_backup
    link: https://github.com/digital-work-lab/theory-elaboration
  - name: draft_theoretical_contributions
    link: https://github.com/digital-work-lab/theo_con_paper
status: under-review
improvement_status: pending
---

# {{ page.title }}

Field               | Value
------------------- | ----------------------------------
Acronym             | {{ page.title }}
Title               | {{ page.title_long }}
Status              | {{ page.status }}
Improvement         | {{ page.improvement_status }}
Started             | {{ page.started }}
Completed           | {{ page.completed }}

{% if page.resources %}
## Resources

  {% for output in page.resources %}
  - [{{ output.name }}]({{ output.link }}){: target="_blank"}
  {% endfor %}
{% endif %}

{% if page.outputs %}
## Outputs

  {% for output in page.outputs %}
  - [{{ output.type }}]({{ output.link }}){: target="_blank"}
  {% endfor %}
{% endif %}

{% if page.related %}
## Related projects 

- {% for item in page.related %}
  - <a href="{{ item }}">{{ item }}</a>
{% endfor %}
{% endif %}
