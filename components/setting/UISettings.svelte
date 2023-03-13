<script>
    import {popupPageI18nValue} from "~utils/constants";
    import SimpleCheckbox from "~components/SimpleCheckbox.svelte";
    import {isAlwaysOpenedSetting, isDebugModeSetting} from "~utils/store/stores";
    import PromiseWaiting from "~components/PromiseWaiting.svelte";
    import Collapse from "~components/Collapse.svelte";

    let promises = [
        isAlwaysOpenedSetting.init(),
        isDebugModeSetting.init()
    ];
</script>

<Collapse title="界面设置">
    <PromiseWaiting {promises}>
        <div class="form-control">
            <SimpleCheckbox
                    isChecked={isAlwaysOpenedSetting}
                    text={popupPageI18nValue.isAlwaysOpenedSetting}
            />
            <SimpleCheckbox
                    isChecked={isDebugModeSetting}
                    text={popupPageI18nValue.isDebugModeSetting}
            />
        </div>
    </PromiseWaiting>
</Collapse>
