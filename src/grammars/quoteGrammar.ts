export const grammar = `
<grammar root="quotes">
   <rule id="quotes">
      <ruleref uri="#person"/>
      <tag>out.person=Object(); out.person.Name =rules.person.name;</tag>
   </rule>
   <rule id="personname">
      <one-of>
         <item>to do is to be<tag>out="Socrates";</tag></item>
         <item>to be is to do<tag>out="Sartre";</tag></item>
         <item>do be do be do<tag>out="Sinatra";</tag></item>
      </one-of>
   </rule>
   <rule id="person">
      <ruleref uri="#personname"/>
      <tag>out.name=rules.personname;</tag>
   </rule>
</grammar>
`