export const grammar = `
<grammar root="intelligent">
    <rule id="intelligent">
        please
        <ruleref uri="#command"/>
        <tag>out.action=rules.command.action; 
             out.object=rules.command.object;</tag>
    </rule>
    
    <rule id="onoffaction">
        <one-of>
            <item>on</item>
            <item>off</item>
        </one-of>
    </rule>

    <rule id="otheraction">
        <one-of>
            <item>open</item>
            <item>close</item>
        </one-of>
    </rule>
    
    <rule id="onoffobject">
         <one-of>
             <item>light</item>
             <item>heat </item>
             <item>AC<tag> out = 'air conditioning'; </tag></item>
             <item>air conditioning </item>
         </one-of>
    </rule>

    <rule id="otherobject">
            <one-of>
                <item>window</item>
                <item>door</item>
            </one-of>
    </rule>

    <rule id="command">
        <one-of>
        <item>
            turn the
            <ruleref uri="#onoffobject"/>
            <ruleref uri="#onoffaction"/>
            <tag>out.object=rules.onoffobject; out.action=rules.onoffaction;</tag></item>
        <item>
            turn
            <ruleref uri="#onoffaction"/>
            the
            <ruleref uri="#onoffobject"/>
            <tag>out.object=rules.onoffobject; out.action=rules.onoffaction;</tag></item>
        <item>
            <ruleref uri="#otheraction"/>
            the
            <ruleref uri="#otherobject"/>
            <tag>out.object=rules.otherobject; out.action=rules.otheraction;</tag></item>
        </one-of>
    </rule>
</grammar>
`