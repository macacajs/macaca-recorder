/* eslint-disable prettier/prettier */
import { Protocol } from 'playwright-core/types/protocol';
import { genInjectID, IServiceManager } from '@/core';

export interface IAccessibility {
  disable(arg: Protocol.Accessibility.disableParameters): Promise<Protocol.Accessibility.disableReturnValue>;
  enable(arg: Protocol.Accessibility.enableParameters): Promise<Protocol.Accessibility.enableReturnValue>;
  getPartialAXTree(arg: Protocol.Accessibility.getPartialAXTreeParameters): Promise<Protocol.Accessibility.getPartialAXTreeReturnValue>;
  getFullAXTree(arg: Protocol.Accessibility.getFullAXTreeParameters): Promise<Protocol.Accessibility.getFullAXTreeReturnValue>;
  getRootAXNode(arg: Protocol.Accessibility.getRootAXNodeParameters): Promise<Protocol.Accessibility.getRootAXNodeReturnValue>;
  getAXNodeAndAncestors(arg: Protocol.Accessibility.getAXNodeAndAncestorsParameters): Promise<Protocol.Accessibility.getAXNodeAndAncestorsReturnValue>;
  getChildAXNodes(arg: Protocol.Accessibility.getChildAXNodesParameters): Promise<Protocol.Accessibility.getChildAXNodesReturnValue>;
  queryAXTree(arg: Protocol.Accessibility.queryAXTreeParameters): Promise<Protocol.Accessibility.queryAXTreeReturnValue>;
}

export const IAccessibility = genInjectID<IAccessibility>()

export interface IAnimation {
  disable(arg: Protocol.Animation.disableParameters): Promise<Protocol.Animation.disableReturnValue>;
  enable(arg: Protocol.Animation.enableParameters): Promise<Protocol.Animation.enableReturnValue>;
  getCurrentTime(arg: Protocol.Animation.getCurrentTimeParameters): Promise<Protocol.Animation.getCurrentTimeReturnValue>;
  getPlaybackRate(arg: Protocol.Animation.getPlaybackRateParameters): Promise<Protocol.Animation.getPlaybackRateReturnValue>;
  releaseAnimations(arg: Protocol.Animation.releaseAnimationsParameters): Promise<Protocol.Animation.releaseAnimationsReturnValue>;
  resolveAnimation(arg: Protocol.Animation.resolveAnimationParameters): Promise<Protocol.Animation.resolveAnimationReturnValue>;
  seekAnimations(arg: Protocol.Animation.seekAnimationsParameters): Promise<Protocol.Animation.seekAnimationsReturnValue>;
  setPaused(arg: Protocol.Animation.setPausedParameters): Promise<Protocol.Animation.setPausedReturnValue>;
  setPlaybackRate(arg: Protocol.Animation.setPlaybackRateParameters): Promise<Protocol.Animation.setPlaybackRateReturnValue>;
  setTiming(arg: Protocol.Animation.setTimingParameters): Promise<Protocol.Animation.setTimingReturnValue>;
}

export const IAnimation = genInjectID<IAnimation>()

export interface IAudits {
  getEncodedResponse(arg: Protocol.Audits.getEncodedResponseParameters): Promise<Protocol.Audits.getEncodedResponseReturnValue>;
  disable(arg: Protocol.Audits.disableParameters): Promise<Protocol.Audits.disableReturnValue>;
  enable(arg: Protocol.Audits.enableParameters): Promise<Protocol.Audits.enableReturnValue>;
  checkContrast(arg: Protocol.Audits.checkContrastParameters): Promise<Protocol.Audits.checkContrastReturnValue>;
}

export const IAudits = genInjectID<IAudits>()

export interface IBackgroundService {
  startObserving(arg: Protocol.BackgroundService.startObservingParameters): Promise<Protocol.BackgroundService.startObservingReturnValue>;
  stopObserving(arg: Protocol.BackgroundService.stopObservingParameters): Promise<Protocol.BackgroundService.stopObservingReturnValue>;
  setRecording(arg: Protocol.BackgroundService.setRecordingParameters): Promise<Protocol.BackgroundService.setRecordingReturnValue>;
  clearEvents(arg: Protocol.BackgroundService.clearEventsParameters): Promise<Protocol.BackgroundService.clearEventsReturnValue>;
}

export const IBackgroundService = genInjectID<IBackgroundService>()

export interface IBrowser {
  setPermission(arg: Protocol.Browser.setPermissionParameters): Promise<Protocol.Browser.setPermissionReturnValue>;
  grantPermissions(arg: Protocol.Browser.grantPermissionsParameters): Promise<Protocol.Browser.grantPermissionsReturnValue>;
  resetPermissions(arg: Protocol.Browser.resetPermissionsParameters): Promise<Protocol.Browser.resetPermissionsReturnValue>;
  setDownloadBehavior(arg: Protocol.Browser.setDownloadBehaviorParameters): Promise<Protocol.Browser.setDownloadBehaviorReturnValue>;
  cancelDownload(arg: Protocol.Browser.cancelDownloadParameters): Promise<Protocol.Browser.cancelDownloadReturnValue>;
  close(arg: Protocol.Browser.closeParameters): Promise<Protocol.Browser.closeReturnValue>;
  crash(arg: Protocol.Browser.crashParameters): Promise<Protocol.Browser.crashReturnValue>;
  crashGpuProcess(arg: Protocol.Browser.crashGpuProcessParameters): Promise<Protocol.Browser.crashGpuProcessReturnValue>;
  getVersion(arg: Protocol.Browser.getVersionParameters): Promise<Protocol.Browser.getVersionReturnValue>;
  getBrowserCommandLine(arg: Protocol.Browser.getBrowserCommandLineParameters): Promise<Protocol.Browser.getBrowserCommandLineReturnValue>;
  getHistograms(arg: Protocol.Browser.getHistogramsParameters): Promise<Protocol.Browser.getHistogramsReturnValue>;
  getHistogram(arg: Protocol.Browser.getHistogramParameters): Promise<Protocol.Browser.getHistogramReturnValue>;
  getWindowBounds(arg: Protocol.Browser.getWindowBoundsParameters): Promise<Protocol.Browser.getWindowBoundsReturnValue>;
  getWindowForTarget(arg: Protocol.Browser.getWindowForTargetParameters): Promise<Protocol.Browser.getWindowForTargetReturnValue>;
  setWindowBounds(arg: Protocol.Browser.setWindowBoundsParameters): Promise<Protocol.Browser.setWindowBoundsReturnValue>;
  setDockTile(arg: Protocol.Browser.setDockTileParameters): Promise<Protocol.Browser.setDockTileReturnValue>;
  executeBrowserCommand(arg: Protocol.Browser.executeBrowserCommandParameters): Promise<Protocol.Browser.executeBrowserCommandReturnValue>;
}

export const IBrowser = genInjectID<IBrowser>()

export interface ICSS {
  addRule(arg: Protocol.CSS.addRuleParameters): Promise<Protocol.CSS.addRuleReturnValue>;
  collectClassNames(arg: Protocol.CSS.collectClassNamesParameters): Promise<Protocol.CSS.collectClassNamesReturnValue>;
  createStyleSheet(arg: Protocol.CSS.createStyleSheetParameters): Promise<Protocol.CSS.createStyleSheetReturnValue>;
  disable(arg: Protocol.CSS.disableParameters): Promise<Protocol.CSS.disableReturnValue>;
  enable(arg: Protocol.CSS.enableParameters): Promise<Protocol.CSS.enableReturnValue>;
  forcePseudoState(arg: Protocol.CSS.forcePseudoStateParameters): Promise<Protocol.CSS.forcePseudoStateReturnValue>;
  getBackgroundColors(arg: Protocol.CSS.getBackgroundColorsParameters): Promise<Protocol.CSS.getBackgroundColorsReturnValue>;
  getComputedStyleForNode(arg: Protocol.CSS.getComputedStyleForNodeParameters): Promise<Protocol.CSS.getComputedStyleForNodeReturnValue>;
  getInlineStylesForNode(arg: Protocol.CSS.getInlineStylesForNodeParameters): Promise<Protocol.CSS.getInlineStylesForNodeReturnValue>;
  getMatchedStylesForNode(arg: Protocol.CSS.getMatchedStylesForNodeParameters): Promise<Protocol.CSS.getMatchedStylesForNodeReturnValue>;
  getMediaQueries(arg: Protocol.CSS.getMediaQueriesParameters): Promise<Protocol.CSS.getMediaQueriesReturnValue>;
  getPlatformFontsForNode(arg: Protocol.CSS.getPlatformFontsForNodeParameters): Promise<Protocol.CSS.getPlatformFontsForNodeReturnValue>;
  getStyleSheetText(arg: Protocol.CSS.getStyleSheetTextParameters): Promise<Protocol.CSS.getStyleSheetTextReturnValue>;
  getLayersForNode(arg: Protocol.CSS.getLayersForNodeParameters): Promise<Protocol.CSS.getLayersForNodeReturnValue>;
  trackComputedStyleUpdates(arg: Protocol.CSS.trackComputedStyleUpdatesParameters): Promise<Protocol.CSS.trackComputedStyleUpdatesReturnValue>;
  takeComputedStyleUpdates(arg: Protocol.CSS.takeComputedStyleUpdatesParameters): Promise<Protocol.CSS.takeComputedStyleUpdatesReturnValue>;
  setEffectivePropertyValueForNode(arg: Protocol.CSS.setEffectivePropertyValueForNodeParameters): Promise<Protocol.CSS.setEffectivePropertyValueForNodeReturnValue>;
  setKeyframeKey(arg: Protocol.CSS.setKeyframeKeyParameters): Promise<Protocol.CSS.setKeyframeKeyReturnValue>;
  setMediaText(arg: Protocol.CSS.setMediaTextParameters): Promise<Protocol.CSS.setMediaTextReturnValue>;
  setContainerQueryText(arg: Protocol.CSS.setContainerQueryTextParameters): Promise<Protocol.CSS.setContainerQueryTextReturnValue>;
  setSupportsText(arg: Protocol.CSS.setSupportsTextParameters): Promise<Protocol.CSS.setSupportsTextReturnValue>;
  setScopeText(arg: Protocol.CSS.setScopeTextParameters): Promise<Protocol.CSS.setScopeTextReturnValue>;
  setRuleSelector(arg: Protocol.CSS.setRuleSelectorParameters): Promise<Protocol.CSS.setRuleSelectorReturnValue>;
  setStyleSheetText(arg: Protocol.CSS.setStyleSheetTextParameters): Promise<Protocol.CSS.setStyleSheetTextReturnValue>;
  setStyleTexts(arg: Protocol.CSS.setStyleTextsParameters): Promise<Protocol.CSS.setStyleTextsReturnValue>;
  startRuleUsageTracking(arg: Protocol.CSS.startRuleUsageTrackingParameters): Promise<Protocol.CSS.startRuleUsageTrackingReturnValue>;
  stopRuleUsageTracking(arg: Protocol.CSS.stopRuleUsageTrackingParameters): Promise<Protocol.CSS.stopRuleUsageTrackingReturnValue>;
  takeCoverageDelta(arg: Protocol.CSS.takeCoverageDeltaParameters): Promise<Protocol.CSS.takeCoverageDeltaReturnValue>;
  setLocalFontsEnabled(arg: Protocol.CSS.setLocalFontsEnabledParameters): Promise<Protocol.CSS.setLocalFontsEnabledReturnValue>;
}

export const ICSS = genInjectID<ICSS>()

export interface ICacheStorage {
  deleteCache(arg: Protocol.CacheStorage.deleteCacheParameters): Promise<Protocol.CacheStorage.deleteCacheReturnValue>;
  deleteEntry(arg: Protocol.CacheStorage.deleteEntryParameters): Promise<Protocol.CacheStorage.deleteEntryReturnValue>;
  requestCacheNames(arg: Protocol.CacheStorage.requestCacheNamesParameters): Promise<Protocol.CacheStorage.requestCacheNamesReturnValue>;
  requestCachedResponse(arg: Protocol.CacheStorage.requestCachedResponseParameters): Promise<Protocol.CacheStorage.requestCachedResponseReturnValue>;
  requestEntries(arg: Protocol.CacheStorage.requestEntriesParameters): Promise<Protocol.CacheStorage.requestEntriesReturnValue>;
}

export const ICacheStorage = genInjectID<ICacheStorage>()

export interface ICast {
  enable(arg: Protocol.Cast.enableParameters): Promise<Protocol.Cast.enableReturnValue>;
  disable(arg: Protocol.Cast.disableParameters): Promise<Protocol.Cast.disableReturnValue>;
  setSinkToUse(arg: Protocol.Cast.setSinkToUseParameters): Promise<Protocol.Cast.setSinkToUseReturnValue>;
  startDesktopMirroring(arg: Protocol.Cast.startDesktopMirroringParameters): Promise<Protocol.Cast.startDesktopMirroringReturnValue>;
  startTabMirroring(arg: Protocol.Cast.startTabMirroringParameters): Promise<Protocol.Cast.startTabMirroringReturnValue>;
  stopCasting(arg: Protocol.Cast.stopCastingParameters): Promise<Protocol.Cast.stopCastingReturnValue>;
}

export const ICast = genInjectID<ICast>()

export interface IDOM {
  collectClassNamesFromSubtree(arg: Protocol.DOM.collectClassNamesFromSubtreeParameters): Promise<Protocol.DOM.collectClassNamesFromSubtreeReturnValue>;
  copyTo(arg: Protocol.DOM.copyToParameters): Promise<Protocol.DOM.copyToReturnValue>;
  describeNode(arg: Protocol.DOM.describeNodeParameters): Promise<Protocol.DOM.describeNodeReturnValue>;
  scrollIntoViewIfNeeded(arg: Protocol.DOM.scrollIntoViewIfNeededParameters): Promise<Protocol.DOM.scrollIntoViewIfNeededReturnValue>;
  disable(arg: Protocol.DOM.disableParameters): Promise<Protocol.DOM.disableReturnValue>;
  discardSearchResults(arg: Protocol.DOM.discardSearchResultsParameters): Promise<Protocol.DOM.discardSearchResultsReturnValue>;
  enable(arg: Protocol.DOM.enableParameters): Promise<Protocol.DOM.enableReturnValue>;
  focus(arg: Protocol.DOM.focusParameters): Promise<Protocol.DOM.focusReturnValue>;
  getAttributes(arg: Protocol.DOM.getAttributesParameters): Promise<Protocol.DOM.getAttributesReturnValue>;
  getBoxModel(arg: Protocol.DOM.getBoxModelParameters): Promise<Protocol.DOM.getBoxModelReturnValue>;
  getContentQuads(arg: Protocol.DOM.getContentQuadsParameters): Promise<Protocol.DOM.getContentQuadsReturnValue>;
  getDocument(arg: Protocol.DOM.getDocumentParameters): Promise<Protocol.DOM.getDocumentReturnValue>;
  getFlattenedDocument(arg: Protocol.DOM.getFlattenedDocumentParameters): Promise<Protocol.DOM.getFlattenedDocumentReturnValue>;
  getNodesForSubtreeByStyle(arg: Protocol.DOM.getNodesForSubtreeByStyleParameters): Promise<Protocol.DOM.getNodesForSubtreeByStyleReturnValue>;
  getNodeForLocation(arg: Protocol.DOM.getNodeForLocationParameters): Promise<Protocol.DOM.getNodeForLocationReturnValue>;
  getOuterHTML(arg: Protocol.DOM.getOuterHTMLParameters): Promise<Protocol.DOM.getOuterHTMLReturnValue>;
  getRelayoutBoundary(arg: Protocol.DOM.getRelayoutBoundaryParameters): Promise<Protocol.DOM.getRelayoutBoundaryReturnValue>;
  getSearchResults(arg: Protocol.DOM.getSearchResultsParameters): Promise<Protocol.DOM.getSearchResultsReturnValue>;
  hideHighlight(arg: Protocol.DOM.hideHighlightParameters): Promise<Protocol.DOM.hideHighlightReturnValue>;
  highlightNode(arg: Protocol.DOM.highlightNodeParameters): Promise<Protocol.DOM.highlightNodeReturnValue>;
  highlightRect(arg: Protocol.DOM.highlightRectParameters): Promise<Protocol.DOM.highlightRectReturnValue>;
  markUndoableState(arg: Protocol.DOM.markUndoableStateParameters): Promise<Protocol.DOM.markUndoableStateReturnValue>;
  moveTo(arg: Protocol.DOM.moveToParameters): Promise<Protocol.DOM.moveToReturnValue>;
  performSearch(arg: Protocol.DOM.performSearchParameters): Promise<Protocol.DOM.performSearchReturnValue>;
  pushNodeByPathToFrontend(arg: Protocol.DOM.pushNodeByPathToFrontendParameters): Promise<Protocol.DOM.pushNodeByPathToFrontendReturnValue>;
  pushNodesByBackendIdsToFrontend(arg: Protocol.DOM.pushNodesByBackendIdsToFrontendParameters): Promise<Protocol.DOM.pushNodesByBackendIdsToFrontendReturnValue>;
  querySelector(arg: Protocol.DOM.querySelectorParameters): Promise<Protocol.DOM.querySelectorReturnValue>;
  querySelectorAll(arg: Protocol.DOM.querySelectorAllParameters): Promise<Protocol.DOM.querySelectorAllReturnValue>;
  getTopLayerElements(arg: Protocol.DOM.getTopLayerElementsParameters): Promise<Protocol.DOM.getTopLayerElementsReturnValue>;
  redo(arg: Protocol.DOM.redoParameters): Promise<Protocol.DOM.redoReturnValue>;
  removeAttribute(arg: Protocol.DOM.removeAttributeParameters): Promise<Protocol.DOM.removeAttributeReturnValue>;
  removeNode(arg: Protocol.DOM.removeNodeParameters): Promise<Protocol.DOM.removeNodeReturnValue>;
  requestChildNodes(arg: Protocol.DOM.requestChildNodesParameters): Promise<Protocol.DOM.requestChildNodesReturnValue>;
  requestNode(arg: Protocol.DOM.requestNodeParameters): Promise<Protocol.DOM.requestNodeReturnValue>;
  resolveNode(arg: Protocol.DOM.resolveNodeParameters): Promise<Protocol.DOM.resolveNodeReturnValue>;
  setAttributeValue(arg: Protocol.DOM.setAttributeValueParameters): Promise<Protocol.DOM.setAttributeValueReturnValue>;
  setAttributesAsText(arg: Protocol.DOM.setAttributesAsTextParameters): Promise<Protocol.DOM.setAttributesAsTextReturnValue>;
  setFileInputFiles(arg: Protocol.DOM.setFileInputFilesParameters): Promise<Protocol.DOM.setFileInputFilesReturnValue>;
  setNodeStackTracesEnabled(arg: Protocol.DOM.setNodeStackTracesEnabledParameters): Promise<Protocol.DOM.setNodeStackTracesEnabledReturnValue>;
  getNodeStackTraces(arg: Protocol.DOM.getNodeStackTracesParameters): Promise<Protocol.DOM.getNodeStackTracesReturnValue>;
  getFileInfo(arg: Protocol.DOM.getFileInfoParameters): Promise<Protocol.DOM.getFileInfoReturnValue>;
  setInspectedNode(arg: Protocol.DOM.setInspectedNodeParameters): Promise<Protocol.DOM.setInspectedNodeReturnValue>;
  setNodeName(arg: Protocol.DOM.setNodeNameParameters): Promise<Protocol.DOM.setNodeNameReturnValue>;
  setNodeValue(arg: Protocol.DOM.setNodeValueParameters): Promise<Protocol.DOM.setNodeValueReturnValue>;
  setOuterHTML(arg: Protocol.DOM.setOuterHTMLParameters): Promise<Protocol.DOM.setOuterHTMLReturnValue>;
  undo(arg: Protocol.DOM.undoParameters): Promise<Protocol.DOM.undoReturnValue>;
  getFrameOwner(arg: Protocol.DOM.getFrameOwnerParameters): Promise<Protocol.DOM.getFrameOwnerReturnValue>;
  getContainerForNode(arg: Protocol.DOM.getContainerForNodeParameters): Promise<Protocol.DOM.getContainerForNodeReturnValue>;
  getQueryingDescendantsForContainer(arg: Protocol.DOM.getQueryingDescendantsForContainerParameters): Promise<Protocol.DOM.getQueryingDescendantsForContainerReturnValue>;
}

export const IDOM = genInjectID<IDOM>()

export interface IDOMDebugger {
  getEventListeners(arg: Protocol.DOMDebugger.getEventListenersParameters): Promise<Protocol.DOMDebugger.getEventListenersReturnValue>;
  removeDOMBreakpoint(arg: Protocol.DOMDebugger.removeDOMBreakpointParameters): Promise<Protocol.DOMDebugger.removeDOMBreakpointReturnValue>;
  removeEventListenerBreakpoint(arg: Protocol.DOMDebugger.removeEventListenerBreakpointParameters): Promise<Protocol.DOMDebugger.removeEventListenerBreakpointReturnValue>;
  removeInstrumentationBreakpoint(arg: Protocol.DOMDebugger.removeInstrumentationBreakpointParameters): Promise<Protocol.DOMDebugger.removeInstrumentationBreakpointReturnValue>;
  removeXHRBreakpoint(arg: Protocol.DOMDebugger.removeXHRBreakpointParameters): Promise<Protocol.DOMDebugger.removeXHRBreakpointReturnValue>;
  setBreakOnCSPViolation(arg: Protocol.DOMDebugger.setBreakOnCSPViolationParameters): Promise<Protocol.DOMDebugger.setBreakOnCSPViolationReturnValue>;
  setDOMBreakpoint(arg: Protocol.DOMDebugger.setDOMBreakpointParameters): Promise<Protocol.DOMDebugger.setDOMBreakpointReturnValue>;
  setEventListenerBreakpoint(arg: Protocol.DOMDebugger.setEventListenerBreakpointParameters): Promise<Protocol.DOMDebugger.setEventListenerBreakpointReturnValue>;
  setInstrumentationBreakpoint(arg: Protocol.DOMDebugger.setInstrumentationBreakpointParameters): Promise<Protocol.DOMDebugger.setInstrumentationBreakpointReturnValue>;
  setXHRBreakpoint(arg: Protocol.DOMDebugger.setXHRBreakpointParameters): Promise<Protocol.DOMDebugger.setXHRBreakpointReturnValue>;
}

export const IDOMDebugger = genInjectID<IDOMDebugger>()

export interface IEventBreakpoints {
  setInstrumentationBreakpoint(arg: Protocol.EventBreakpoints.setInstrumentationBreakpointParameters): Promise<Protocol.EventBreakpoints.setInstrumentationBreakpointReturnValue>;
  removeInstrumentationBreakpoint(arg: Protocol.EventBreakpoints.removeInstrumentationBreakpointParameters): Promise<Protocol.EventBreakpoints.removeInstrumentationBreakpointReturnValue>;
}

export const IEventBreakpoints = genInjectID<IEventBreakpoints>()

export interface IDOMSnapshot {
  disable(arg: Protocol.DOMSnapshot.disableParameters): Promise<Protocol.DOMSnapshot.disableReturnValue>;
  enable(arg: Protocol.DOMSnapshot.enableParameters): Promise<Protocol.DOMSnapshot.enableReturnValue>;
  getSnapshot(arg: Protocol.DOMSnapshot.getSnapshotParameters): Promise<Protocol.DOMSnapshot.getSnapshotReturnValue>;
  captureSnapshot(arg: Protocol.DOMSnapshot.captureSnapshotParameters): Promise<Protocol.DOMSnapshot.captureSnapshotReturnValue>;
}

export const IDOMSnapshot = genInjectID<IDOMSnapshot>()

export interface IDOMStorage {
  clear(arg: Protocol.DOMStorage.clearParameters): Promise<Protocol.DOMStorage.clearReturnValue>;
  disable(arg: Protocol.DOMStorage.disableParameters): Promise<Protocol.DOMStorage.disableReturnValue>;
  enable(arg: Protocol.DOMStorage.enableParameters): Promise<Protocol.DOMStorage.enableReturnValue>;
  getDOMStorageItems(arg: Protocol.DOMStorage.getDOMStorageItemsParameters): Promise<Protocol.DOMStorage.getDOMStorageItemsReturnValue>;
  removeDOMStorageItem(arg: Protocol.DOMStorage.removeDOMStorageItemParameters): Promise<Protocol.DOMStorage.removeDOMStorageItemReturnValue>;
  setDOMStorageItem(arg: Protocol.DOMStorage.setDOMStorageItemParameters): Promise<Protocol.DOMStorage.setDOMStorageItemReturnValue>;
}

export const IDOMStorage = genInjectID<IDOMStorage>()

export interface IDatabase {
  disable(arg: Protocol.Database.disableParameters): Promise<Protocol.Database.disableReturnValue>;
  enable(arg: Protocol.Database.enableParameters): Promise<Protocol.Database.enableReturnValue>;
  executeSQL(arg: Protocol.Database.executeSQLParameters): Promise<Protocol.Database.executeSQLReturnValue>;
  getDatabaseTableNames(arg: Protocol.Database.getDatabaseTableNamesParameters): Promise<Protocol.Database.getDatabaseTableNamesReturnValue>;
}

export const IDatabase = genInjectID<IDatabase>()

export interface IDeviceOrientation {
  clearDeviceOrientationOverride(arg: Protocol.DeviceOrientation.clearDeviceOrientationOverrideParameters): Promise<Protocol.DeviceOrientation.clearDeviceOrientationOverrideReturnValue>;
  setDeviceOrientationOverride(arg: Protocol.DeviceOrientation.setDeviceOrientationOverrideParameters): Promise<Protocol.DeviceOrientation.setDeviceOrientationOverrideReturnValue>;
}

export const IDeviceOrientation = genInjectID<IDeviceOrientation>()

export interface IEmulation {
  canEmulate(arg: Protocol.Emulation.canEmulateParameters): Promise<Protocol.Emulation.canEmulateReturnValue>;
  clearDeviceMetricsOverride(arg: Protocol.Emulation.clearDeviceMetricsOverrideParameters): Promise<Protocol.Emulation.clearDeviceMetricsOverrideReturnValue>;
  clearGeolocationOverride(arg: Protocol.Emulation.clearGeolocationOverrideParameters): Promise<Protocol.Emulation.clearGeolocationOverrideReturnValue>;
  resetPageScaleFactor(arg: Protocol.Emulation.resetPageScaleFactorParameters): Promise<Protocol.Emulation.resetPageScaleFactorReturnValue>;
  setFocusEmulationEnabled(arg: Protocol.Emulation.setFocusEmulationEnabledParameters): Promise<Protocol.Emulation.setFocusEmulationEnabledReturnValue>;
  setAutoDarkModeOverride(arg: Protocol.Emulation.setAutoDarkModeOverrideParameters): Promise<Protocol.Emulation.setAutoDarkModeOverrideReturnValue>;
  setCPUThrottlingRate(arg: Protocol.Emulation.setCPUThrottlingRateParameters): Promise<Protocol.Emulation.setCPUThrottlingRateReturnValue>;
  setDefaultBackgroundColorOverride(arg: Protocol.Emulation.setDefaultBackgroundColorOverrideParameters): Promise<Protocol.Emulation.setDefaultBackgroundColorOverrideReturnValue>;
  setDeviceMetricsOverride(arg: Protocol.Emulation.setDeviceMetricsOverrideParameters): Promise<Protocol.Emulation.setDeviceMetricsOverrideReturnValue>;
  setScrollbarsHidden(arg: Protocol.Emulation.setScrollbarsHiddenParameters): Promise<Protocol.Emulation.setScrollbarsHiddenReturnValue>;
  setDocumentCookieDisabled(arg: Protocol.Emulation.setDocumentCookieDisabledParameters): Promise<Protocol.Emulation.setDocumentCookieDisabledReturnValue>;
  setEmitTouchEventsForMouse(arg: Protocol.Emulation.setEmitTouchEventsForMouseParameters): Promise<Protocol.Emulation.setEmitTouchEventsForMouseReturnValue>;
  setEmulatedMedia(arg: Protocol.Emulation.setEmulatedMediaParameters): Promise<Protocol.Emulation.setEmulatedMediaReturnValue>;
  setEmulatedVisionDeficiency(arg: Protocol.Emulation.setEmulatedVisionDeficiencyParameters): Promise<Protocol.Emulation.setEmulatedVisionDeficiencyReturnValue>;
  setGeolocationOverride(arg: Protocol.Emulation.setGeolocationOverrideParameters): Promise<Protocol.Emulation.setGeolocationOverrideReturnValue>;
  setIdleOverride(arg: Protocol.Emulation.setIdleOverrideParameters): Promise<Protocol.Emulation.setIdleOverrideReturnValue>;
  clearIdleOverride(arg: Protocol.Emulation.clearIdleOverrideParameters): Promise<Protocol.Emulation.clearIdleOverrideReturnValue>;
  setNavigatorOverrides(arg: Protocol.Emulation.setNavigatorOverridesParameters): Promise<Protocol.Emulation.setNavigatorOverridesReturnValue>;
  setPageScaleFactor(arg: Protocol.Emulation.setPageScaleFactorParameters): Promise<Protocol.Emulation.setPageScaleFactorReturnValue>;
  setScriptExecutionDisabled(arg: Protocol.Emulation.setScriptExecutionDisabledParameters): Promise<Protocol.Emulation.setScriptExecutionDisabledReturnValue>;
  setTouchEmulationEnabled(arg: Protocol.Emulation.setTouchEmulationEnabledParameters): Promise<Protocol.Emulation.setTouchEmulationEnabledReturnValue>;
  setVirtualTimePolicy(arg: Protocol.Emulation.setVirtualTimePolicyParameters): Promise<Protocol.Emulation.setVirtualTimePolicyReturnValue>;
  setLocaleOverride(arg: Protocol.Emulation.setLocaleOverrideParameters): Promise<Protocol.Emulation.setLocaleOverrideReturnValue>;
  setTimezoneOverride(arg: Protocol.Emulation.setTimezoneOverrideParameters): Promise<Protocol.Emulation.setTimezoneOverrideReturnValue>;
  setVisibleSize(arg: Protocol.Emulation.setVisibleSizeParameters): Promise<Protocol.Emulation.setVisibleSizeReturnValue>;
  setDisabledImageTypes(arg: Protocol.Emulation.setDisabledImageTypesParameters): Promise<Protocol.Emulation.setDisabledImageTypesReturnValue>;
  setHardwareConcurrencyOverride(arg: Protocol.Emulation.setHardwareConcurrencyOverrideParameters): Promise<Protocol.Emulation.setHardwareConcurrencyOverrideReturnValue>;
  setUserAgentOverride(arg: Protocol.Emulation.setUserAgentOverrideParameters): Promise<Protocol.Emulation.setUserAgentOverrideReturnValue>;
  setAutomationOverride(arg: Protocol.Emulation.setAutomationOverrideParameters): Promise<Protocol.Emulation.setAutomationOverrideReturnValue>;
}

export const IEmulation = genInjectID<IEmulation>()

export interface IHeadlessExperimental {
  beginFrame(arg: Protocol.HeadlessExperimental.beginFrameParameters): Promise<Protocol.HeadlessExperimental.beginFrameReturnValue>;
  disable(arg: Protocol.HeadlessExperimental.disableParameters): Promise<Protocol.HeadlessExperimental.disableReturnValue>;
  enable(arg: Protocol.HeadlessExperimental.enableParameters): Promise<Protocol.HeadlessExperimental.enableReturnValue>;
}

export const IHeadlessExperimental = genInjectID<IHeadlessExperimental>()

export interface IIO {
  close(arg: Protocol.IO.closeParameters): Promise<Protocol.IO.closeReturnValue>;
  read(arg: Protocol.IO.readParameters): Promise<Protocol.IO.readReturnValue>;
  resolveBlob(arg: Protocol.IO.resolveBlobParameters): Promise<Protocol.IO.resolveBlobReturnValue>;
}

export const IIO = genInjectID<IIO>()

export interface IIndexedDB {
  clearObjectStore(arg: Protocol.IndexedDB.clearObjectStoreParameters): Promise<Protocol.IndexedDB.clearObjectStoreReturnValue>;
  deleteDatabase(arg: Protocol.IndexedDB.deleteDatabaseParameters): Promise<Protocol.IndexedDB.deleteDatabaseReturnValue>;
  deleteObjectStoreEntries(arg: Protocol.IndexedDB.deleteObjectStoreEntriesParameters): Promise<Protocol.IndexedDB.deleteObjectStoreEntriesReturnValue>;
  disable(arg: Protocol.IndexedDB.disableParameters): Promise<Protocol.IndexedDB.disableReturnValue>;
  enable(arg: Protocol.IndexedDB.enableParameters): Promise<Protocol.IndexedDB.enableReturnValue>;
  requestData(arg: Protocol.IndexedDB.requestDataParameters): Promise<Protocol.IndexedDB.requestDataReturnValue>;
  getMetadata(arg: Protocol.IndexedDB.getMetadataParameters): Promise<Protocol.IndexedDB.getMetadataReturnValue>;
  requestDatabase(arg: Protocol.IndexedDB.requestDatabaseParameters): Promise<Protocol.IndexedDB.requestDatabaseReturnValue>;
  requestDatabaseNames(arg: Protocol.IndexedDB.requestDatabaseNamesParameters): Promise<Protocol.IndexedDB.requestDatabaseNamesReturnValue>;
}

export const IIndexedDB = genInjectID<IIndexedDB>()

export interface IInput {
  dispatchDragEvent(arg: Protocol.Input.dispatchDragEventParameters): Promise<Protocol.Input.dispatchDragEventReturnValue>;
  dispatchKeyEvent(arg: Protocol.Input.dispatchKeyEventParameters): Promise<Protocol.Input.dispatchKeyEventReturnValue>;
  insertText(arg: Protocol.Input.insertTextParameters): Promise<Protocol.Input.insertTextReturnValue>;
  imeSetComposition(arg: Protocol.Input.imeSetCompositionParameters): Promise<Protocol.Input.imeSetCompositionReturnValue>;
  dispatchMouseEvent(arg: Protocol.Input.dispatchMouseEventParameters): Promise<Protocol.Input.dispatchMouseEventReturnValue>;
  dispatchTouchEvent(arg: Protocol.Input.dispatchTouchEventParameters): Promise<Protocol.Input.dispatchTouchEventReturnValue>;
  emulateTouchFromMouseEvent(arg: Protocol.Input.emulateTouchFromMouseEventParameters): Promise<Protocol.Input.emulateTouchFromMouseEventReturnValue>;
  setIgnoreInputEvents(arg: Protocol.Input.setIgnoreInputEventsParameters): Promise<Protocol.Input.setIgnoreInputEventsReturnValue>;
  setInterceptDrags(arg: Protocol.Input.setInterceptDragsParameters): Promise<Protocol.Input.setInterceptDragsReturnValue>;
  synthesizePinchGesture(arg: Protocol.Input.synthesizePinchGestureParameters): Promise<Protocol.Input.synthesizePinchGestureReturnValue>;
  synthesizeScrollGesture(arg: Protocol.Input.synthesizeScrollGestureParameters): Promise<Protocol.Input.synthesizeScrollGestureReturnValue>;
  synthesizeTapGesture(arg: Protocol.Input.synthesizeTapGestureParameters): Promise<Protocol.Input.synthesizeTapGestureReturnValue>;
}

export const IInput = genInjectID<IInput>()

export interface IInspector {
  disable(arg: Protocol.Inspector.disableParameters): Promise<Protocol.Inspector.disableReturnValue>;
  enable(arg: Protocol.Inspector.enableParameters): Promise<Protocol.Inspector.enableReturnValue>;
}

export const IInspector = genInjectID<IInspector>()

export interface ILayerTree {
  compositingReasons(arg: Protocol.LayerTree.compositingReasonsParameters): Promise<Protocol.LayerTree.compositingReasonsReturnValue>;
  disable(arg: Protocol.LayerTree.disableParameters): Promise<Protocol.LayerTree.disableReturnValue>;
  enable(arg: Protocol.LayerTree.enableParameters): Promise<Protocol.LayerTree.enableReturnValue>;
  loadSnapshot(arg: Protocol.LayerTree.loadSnapshotParameters): Promise<Protocol.LayerTree.loadSnapshotReturnValue>;
  makeSnapshot(arg: Protocol.LayerTree.makeSnapshotParameters): Promise<Protocol.LayerTree.makeSnapshotReturnValue>;
  profileSnapshot(arg: Protocol.LayerTree.profileSnapshotParameters): Promise<Protocol.LayerTree.profileSnapshotReturnValue>;
  releaseSnapshot(arg: Protocol.LayerTree.releaseSnapshotParameters): Promise<Protocol.LayerTree.releaseSnapshotReturnValue>;
  replaySnapshot(arg: Protocol.LayerTree.replaySnapshotParameters): Promise<Protocol.LayerTree.replaySnapshotReturnValue>;
  snapshotCommandLog(arg: Protocol.LayerTree.snapshotCommandLogParameters): Promise<Protocol.LayerTree.snapshotCommandLogReturnValue>;
}

export const ILayerTree = genInjectID<ILayerTree>()

export interface ILog {
  clear(arg: Protocol.Log.clearParameters): Promise<Protocol.Log.clearReturnValue>;
  disable(arg: Protocol.Log.disableParameters): Promise<Protocol.Log.disableReturnValue>;
  enable(arg: Protocol.Log.enableParameters): Promise<Protocol.Log.enableReturnValue>;
  startViolationsReport(arg: Protocol.Log.startViolationsReportParameters): Promise<Protocol.Log.startViolationsReportReturnValue>;
  stopViolationsReport(arg: Protocol.Log.stopViolationsReportParameters): Promise<Protocol.Log.stopViolationsReportReturnValue>;
}

export const ILog = genInjectID<ILog>()

export interface IMemory {
  getDOMCounters(arg: Protocol.Memory.getDOMCountersParameters): Promise<Protocol.Memory.getDOMCountersReturnValue>;
  prepareForLeakDetection(arg: Protocol.Memory.prepareForLeakDetectionParameters): Promise<Protocol.Memory.prepareForLeakDetectionReturnValue>;
  forciblyPurgeJavaScriptMemory(arg: Protocol.Memory.forciblyPurgeJavaScriptMemoryParameters): Promise<Protocol.Memory.forciblyPurgeJavaScriptMemoryReturnValue>;
  setPressureNotificationsSuppressed(arg: Protocol.Memory.setPressureNotificationsSuppressedParameters): Promise<Protocol.Memory.setPressureNotificationsSuppressedReturnValue>;
  simulatePressureNotification(arg: Protocol.Memory.simulatePressureNotificationParameters): Promise<Protocol.Memory.simulatePressureNotificationReturnValue>;
  startSampling(arg: Protocol.Memory.startSamplingParameters): Promise<Protocol.Memory.startSamplingReturnValue>;
  stopSampling(arg: Protocol.Memory.stopSamplingParameters): Promise<Protocol.Memory.stopSamplingReturnValue>;
  getAllTimeSamplingProfile(arg: Protocol.Memory.getAllTimeSamplingProfileParameters): Promise<Protocol.Memory.getAllTimeSamplingProfileReturnValue>;
  getBrowserSamplingProfile(arg: Protocol.Memory.getBrowserSamplingProfileParameters): Promise<Protocol.Memory.getBrowserSamplingProfileReturnValue>;
  getSamplingProfile(arg: Protocol.Memory.getSamplingProfileParameters): Promise<Protocol.Memory.getSamplingProfileReturnValue>;
}

export const IMemory = genInjectID<IMemory>()

export interface INetwork {
  setAcceptedEncodings(arg: Protocol.Network.setAcceptedEncodingsParameters): Promise<Protocol.Network.setAcceptedEncodingsReturnValue>;
  clearAcceptedEncodingsOverride(arg: Protocol.Network.clearAcceptedEncodingsOverrideParameters): Promise<Protocol.Network.clearAcceptedEncodingsOverrideReturnValue>;
  canClearBrowserCache(arg: Protocol.Network.canClearBrowserCacheParameters): Promise<Protocol.Network.canClearBrowserCacheReturnValue>;
  canClearBrowserCookies(arg: Protocol.Network.canClearBrowserCookiesParameters): Promise<Protocol.Network.canClearBrowserCookiesReturnValue>;
  canEmulateNetworkConditions(arg: Protocol.Network.canEmulateNetworkConditionsParameters): Promise<Protocol.Network.canEmulateNetworkConditionsReturnValue>;
  clearBrowserCache(arg: Protocol.Network.clearBrowserCacheParameters): Promise<Protocol.Network.clearBrowserCacheReturnValue>;
  clearBrowserCookies(arg: Protocol.Network.clearBrowserCookiesParameters): Promise<Protocol.Network.clearBrowserCookiesReturnValue>;
  continueInterceptedRequest(arg: Protocol.Network.continueInterceptedRequestParameters): Promise<Protocol.Network.continueInterceptedRequestReturnValue>;
  deleteCookies(arg: Protocol.Network.deleteCookiesParameters): Promise<Protocol.Network.deleteCookiesReturnValue>;
  disable(arg: Protocol.Network.disableParameters): Promise<Protocol.Network.disableReturnValue>;
  emulateNetworkConditions(arg: Protocol.Network.emulateNetworkConditionsParameters): Promise<Protocol.Network.emulateNetworkConditionsReturnValue>;
  enable(arg: Protocol.Network.enableParameters): Promise<Protocol.Network.enableReturnValue>;
  getAllCookies(arg: Protocol.Network.getAllCookiesParameters): Promise<Protocol.Network.getAllCookiesReturnValue>;
  getCertificate(arg: Protocol.Network.getCertificateParameters): Promise<Protocol.Network.getCertificateReturnValue>;
  getCookies(arg: Protocol.Network.getCookiesParameters): Promise<Protocol.Network.getCookiesReturnValue>;
  getResponseBody(arg: Protocol.Network.getResponseBodyParameters): Promise<Protocol.Network.getResponseBodyReturnValue>;
  getRequestPostData(arg: Protocol.Network.getRequestPostDataParameters): Promise<Protocol.Network.getRequestPostDataReturnValue>;
  getResponseBodyForInterception(arg: Protocol.Network.getResponseBodyForInterceptionParameters): Promise<Protocol.Network.getResponseBodyForInterceptionReturnValue>;
  takeResponseBodyForInterceptionAsStream(arg: Protocol.Network.takeResponseBodyForInterceptionAsStreamParameters): Promise<Protocol.Network.takeResponseBodyForInterceptionAsStreamReturnValue>;
  replayXHR(arg: Protocol.Network.replayXHRParameters): Promise<Protocol.Network.replayXHRReturnValue>;
  searchInResponseBody(arg: Protocol.Network.searchInResponseBodyParameters): Promise<Protocol.Network.searchInResponseBodyReturnValue>;
  setBlockedURLs(arg: Protocol.Network.setBlockedURLsParameters): Promise<Protocol.Network.setBlockedURLsReturnValue>;
  setBypassServiceWorker(arg: Protocol.Network.setBypassServiceWorkerParameters): Promise<Protocol.Network.setBypassServiceWorkerReturnValue>;
  setCacheDisabled(arg: Protocol.Network.setCacheDisabledParameters): Promise<Protocol.Network.setCacheDisabledReturnValue>;
  setCookie(arg: Protocol.Network.setCookieParameters): Promise<Protocol.Network.setCookieReturnValue>;
  setCookies(arg: Protocol.Network.setCookiesParameters): Promise<Protocol.Network.setCookiesReturnValue>;
  setExtraHTTPHeaders(arg: Protocol.Network.setExtraHTTPHeadersParameters): Promise<Protocol.Network.setExtraHTTPHeadersReturnValue>;
  setAttachDebugStack(arg: Protocol.Network.setAttachDebugStackParameters): Promise<Protocol.Network.setAttachDebugStackReturnValue>;
  setRequestInterception(arg: Protocol.Network.setRequestInterceptionParameters): Promise<Protocol.Network.setRequestInterceptionReturnValue>;
  setUserAgentOverride(arg: Protocol.Network.setUserAgentOverrideParameters): Promise<Protocol.Network.setUserAgentOverrideReturnValue>;
  getSecurityIsolationStatus(arg: Protocol.Network.getSecurityIsolationStatusParameters): Promise<Protocol.Network.getSecurityIsolationStatusReturnValue>;
  enableReportingApi(arg: Protocol.Network.enableReportingApiParameters): Promise<Protocol.Network.enableReportingApiReturnValue>;
  loadNetworkResource(arg: Protocol.Network.loadNetworkResourceParameters): Promise<Protocol.Network.loadNetworkResourceReturnValue>;
}

export const INetwork = genInjectID<INetwork>()

export interface IOverlay {
  disable(arg: Protocol.Overlay.disableParameters): Promise<Protocol.Overlay.disableReturnValue>;
  enable(arg: Protocol.Overlay.enableParameters): Promise<Protocol.Overlay.enableReturnValue>;
  getHighlightObjectForTest(arg: Protocol.Overlay.getHighlightObjectForTestParameters): Promise<Protocol.Overlay.getHighlightObjectForTestReturnValue>;
  getGridHighlightObjectsForTest(arg: Protocol.Overlay.getGridHighlightObjectsForTestParameters): Promise<Protocol.Overlay.getGridHighlightObjectsForTestReturnValue>;
  getSourceOrderHighlightObjectForTest(arg: Protocol.Overlay.getSourceOrderHighlightObjectForTestParameters): Promise<Protocol.Overlay.getSourceOrderHighlightObjectForTestReturnValue>;
  hideHighlight(arg: Protocol.Overlay.hideHighlightParameters): Promise<Protocol.Overlay.hideHighlightReturnValue>;
  highlightFrame(arg: Protocol.Overlay.highlightFrameParameters): Promise<Protocol.Overlay.highlightFrameReturnValue>;
  highlightNode(arg: Protocol.Overlay.highlightNodeParameters): Promise<Protocol.Overlay.highlightNodeReturnValue>;
  highlightQuad(arg: Protocol.Overlay.highlightQuadParameters): Promise<Protocol.Overlay.highlightQuadReturnValue>;
  highlightRect(arg: Protocol.Overlay.highlightRectParameters): Promise<Protocol.Overlay.highlightRectReturnValue>;
  highlightSourceOrder(arg: Protocol.Overlay.highlightSourceOrderParameters): Promise<Protocol.Overlay.highlightSourceOrderReturnValue>;
  setInspectMode(arg: Protocol.Overlay.setInspectModeParameters): Promise<Protocol.Overlay.setInspectModeReturnValue>;
  setShowAdHighlights(arg: Protocol.Overlay.setShowAdHighlightsParameters): Promise<Protocol.Overlay.setShowAdHighlightsReturnValue>;
  setPausedInDebuggerMessage(arg: Protocol.Overlay.setPausedInDebuggerMessageParameters): Promise<Protocol.Overlay.setPausedInDebuggerMessageReturnValue>;
  setShowDebugBorders(arg: Protocol.Overlay.setShowDebugBordersParameters): Promise<Protocol.Overlay.setShowDebugBordersReturnValue>;
  setShowFPSCounter(arg: Protocol.Overlay.setShowFPSCounterParameters): Promise<Protocol.Overlay.setShowFPSCounterReturnValue>;
  setShowGridOverlays(arg: Protocol.Overlay.setShowGridOverlaysParameters): Promise<Protocol.Overlay.setShowGridOverlaysReturnValue>;
  setShowFlexOverlays(arg: Protocol.Overlay.setShowFlexOverlaysParameters): Promise<Protocol.Overlay.setShowFlexOverlaysReturnValue>;
  setShowScrollSnapOverlays(arg: Protocol.Overlay.setShowScrollSnapOverlaysParameters): Promise<Protocol.Overlay.setShowScrollSnapOverlaysReturnValue>;
  setShowContainerQueryOverlays(arg: Protocol.Overlay.setShowContainerQueryOverlaysParameters): Promise<Protocol.Overlay.setShowContainerQueryOverlaysReturnValue>;
  setShowPaintRects(arg: Protocol.Overlay.setShowPaintRectsParameters): Promise<Protocol.Overlay.setShowPaintRectsReturnValue>;
  setShowLayoutShiftRegions(arg: Protocol.Overlay.setShowLayoutShiftRegionsParameters): Promise<Protocol.Overlay.setShowLayoutShiftRegionsReturnValue>;
  setShowScrollBottleneckRects(arg: Protocol.Overlay.setShowScrollBottleneckRectsParameters): Promise<Protocol.Overlay.setShowScrollBottleneckRectsReturnValue>;
  setShowHitTestBorders(arg: Protocol.Overlay.setShowHitTestBordersParameters): Promise<Protocol.Overlay.setShowHitTestBordersReturnValue>;
  setShowWebVitals(arg: Protocol.Overlay.setShowWebVitalsParameters): Promise<Protocol.Overlay.setShowWebVitalsReturnValue>;
  setShowViewportSizeOnResize(arg: Protocol.Overlay.setShowViewportSizeOnResizeParameters): Promise<Protocol.Overlay.setShowViewportSizeOnResizeReturnValue>;
  setShowHinge(arg: Protocol.Overlay.setShowHingeParameters): Promise<Protocol.Overlay.setShowHingeReturnValue>;
  setShowIsolatedElements(arg: Protocol.Overlay.setShowIsolatedElementsParameters): Promise<Protocol.Overlay.setShowIsolatedElementsReturnValue>;
}

export const IOverlay = genInjectID<IOverlay>()

export interface IPage {
  addScriptToEvaluateOnLoad(arg: Protocol.Page.addScriptToEvaluateOnLoadParameters): Promise<Protocol.Page.addScriptToEvaluateOnLoadReturnValue>;
  addScriptToEvaluateOnNewDocument(arg: Protocol.Page.addScriptToEvaluateOnNewDocumentParameters): Promise<Protocol.Page.addScriptToEvaluateOnNewDocumentReturnValue>;
  bringToFront(arg: Protocol.Page.bringToFrontParameters): Promise<Protocol.Page.bringToFrontReturnValue>;
  captureScreenshot(arg: Protocol.Page.captureScreenshotParameters): Promise<Protocol.Page.captureScreenshotReturnValue>;
  captureSnapshot(arg: Protocol.Page.captureSnapshotParameters): Promise<Protocol.Page.captureSnapshotReturnValue>;
  clearDeviceMetricsOverride(arg: Protocol.Page.clearDeviceMetricsOverrideParameters): Promise<Protocol.Page.clearDeviceMetricsOverrideReturnValue>;
  clearDeviceOrientationOverride(arg: Protocol.Page.clearDeviceOrientationOverrideParameters): Promise<Protocol.Page.clearDeviceOrientationOverrideReturnValue>;
  clearGeolocationOverride(arg: Protocol.Page.clearGeolocationOverrideParameters): Promise<Protocol.Page.clearGeolocationOverrideReturnValue>;
  createIsolatedWorld(arg: Protocol.Page.createIsolatedWorldParameters): Promise<Protocol.Page.createIsolatedWorldReturnValue>;
  deleteCookie(arg: Protocol.Page.deleteCookieParameters): Promise<Protocol.Page.deleteCookieReturnValue>;
  disable(arg: Protocol.Page.disableParameters): Promise<Protocol.Page.disableReturnValue>;
  enable(arg: Protocol.Page.enableParameters): Promise<Protocol.Page.enableReturnValue>;
  getAppManifest(arg: Protocol.Page.getAppManifestParameters): Promise<Protocol.Page.getAppManifestReturnValue>;
  getInstallabilityErrors(arg: Protocol.Page.getInstallabilityErrorsParameters): Promise<Protocol.Page.getInstallabilityErrorsReturnValue>;
  getManifestIcons(arg: Protocol.Page.getManifestIconsParameters): Promise<Protocol.Page.getManifestIconsReturnValue>;
  getAppId(arg: Protocol.Page.getAppIdParameters): Promise<Protocol.Page.getAppIdReturnValue>;
  getCookies(arg: Protocol.Page.getCookiesParameters): Promise<Protocol.Page.getCookiesReturnValue>;
  getFrameTree(arg: Protocol.Page.getFrameTreeParameters): Promise<Protocol.Page.getFrameTreeReturnValue>;
  getLayoutMetrics(arg: Protocol.Page.getLayoutMetricsParameters): Promise<Protocol.Page.getLayoutMetricsReturnValue>;
  getNavigationHistory(arg: Protocol.Page.getNavigationHistoryParameters): Promise<Protocol.Page.getNavigationHistoryReturnValue>;
  resetNavigationHistory(arg: Protocol.Page.resetNavigationHistoryParameters): Promise<Protocol.Page.resetNavigationHistoryReturnValue>;
  getResourceContent(arg: Protocol.Page.getResourceContentParameters): Promise<Protocol.Page.getResourceContentReturnValue>;
  getResourceTree(arg: Protocol.Page.getResourceTreeParameters): Promise<Protocol.Page.getResourceTreeReturnValue>;
  handleJavaScriptDialog(arg: Protocol.Page.handleJavaScriptDialogParameters): Promise<Protocol.Page.handleJavaScriptDialogReturnValue>;
  navigate(arg: Protocol.Page.navigateParameters): Promise<Protocol.Page.navigateReturnValue>;
  navigateToHistoryEntry(arg: Protocol.Page.navigateToHistoryEntryParameters): Promise<Protocol.Page.navigateToHistoryEntryReturnValue>;
  printToPDF(arg: Protocol.Page.printToPDFParameters): Promise<Protocol.Page.printToPDFReturnValue>;
  reload(arg: Protocol.Page.reloadParameters): Promise<Protocol.Page.reloadReturnValue>;
  removeScriptToEvaluateOnLoad(arg: Protocol.Page.removeScriptToEvaluateOnLoadParameters): Promise<Protocol.Page.removeScriptToEvaluateOnLoadReturnValue>;
  removeScriptToEvaluateOnNewDocument(arg: Protocol.Page.removeScriptToEvaluateOnNewDocumentParameters): Promise<Protocol.Page.removeScriptToEvaluateOnNewDocumentReturnValue>;
  screencastFrameAck(arg: Protocol.Page.screencastFrameAckParameters): Promise<Protocol.Page.screencastFrameAckReturnValue>;
  searchInResource(arg: Protocol.Page.searchInResourceParameters): Promise<Protocol.Page.searchInResourceReturnValue>;
  setAdBlockingEnabled(arg: Protocol.Page.setAdBlockingEnabledParameters): Promise<Protocol.Page.setAdBlockingEnabledReturnValue>;
  setBypassCSP(arg: Protocol.Page.setBypassCSPParameters): Promise<Protocol.Page.setBypassCSPReturnValue>;
  getPermissionsPolicyState(arg: Protocol.Page.getPermissionsPolicyStateParameters): Promise<Protocol.Page.getPermissionsPolicyStateReturnValue>;
  getOriginTrials(arg: Protocol.Page.getOriginTrialsParameters): Promise<Protocol.Page.getOriginTrialsReturnValue>;
  setDeviceMetricsOverride(arg: Protocol.Page.setDeviceMetricsOverrideParameters): Promise<Protocol.Page.setDeviceMetricsOverrideReturnValue>;
  setDeviceOrientationOverride(arg: Protocol.Page.setDeviceOrientationOverrideParameters): Promise<Protocol.Page.setDeviceOrientationOverrideReturnValue>;
  setFontFamilies(arg: Protocol.Page.setFontFamiliesParameters): Promise<Protocol.Page.setFontFamiliesReturnValue>;
  setFontSizes(arg: Protocol.Page.setFontSizesParameters): Promise<Protocol.Page.setFontSizesReturnValue>;
  setDocumentContent(arg: Protocol.Page.setDocumentContentParameters): Promise<Protocol.Page.setDocumentContentReturnValue>;
  setDownloadBehavior(arg: Protocol.Page.setDownloadBehaviorParameters): Promise<Protocol.Page.setDownloadBehaviorReturnValue>;
  setGeolocationOverride(arg: Protocol.Page.setGeolocationOverrideParameters): Promise<Protocol.Page.setGeolocationOverrideReturnValue>;
  setLifecycleEventsEnabled(arg: Protocol.Page.setLifecycleEventsEnabledParameters): Promise<Protocol.Page.setLifecycleEventsEnabledReturnValue>;
  setTouchEmulationEnabled(arg: Protocol.Page.setTouchEmulationEnabledParameters): Promise<Protocol.Page.setTouchEmulationEnabledReturnValue>;
  startScreencast(arg: Protocol.Page.startScreencastParameters): Promise<Protocol.Page.startScreencastReturnValue>;
  stopLoading(arg: Protocol.Page.stopLoadingParameters): Promise<Protocol.Page.stopLoadingReturnValue>;
  crash(arg: Protocol.Page.crashParameters): Promise<Protocol.Page.crashReturnValue>;
  close(arg: Protocol.Page.closeParameters): Promise<Protocol.Page.closeReturnValue>;
  setWebLifecycleState(arg: Protocol.Page.setWebLifecycleStateParameters): Promise<Protocol.Page.setWebLifecycleStateReturnValue>;
  stopScreencast(arg: Protocol.Page.stopScreencastParameters): Promise<Protocol.Page.stopScreencastReturnValue>;
  produceCompilationCache(arg: Protocol.Page.produceCompilationCacheParameters): Promise<Protocol.Page.produceCompilationCacheReturnValue>;
  addCompilationCache(arg: Protocol.Page.addCompilationCacheParameters): Promise<Protocol.Page.addCompilationCacheReturnValue>;
  clearCompilationCache(arg: Protocol.Page.clearCompilationCacheParameters): Promise<Protocol.Page.clearCompilationCacheReturnValue>;
  setSPCTransactionMode(arg: Protocol.Page.setSPCTransactionModeParameters): Promise<Protocol.Page.setSPCTransactionModeReturnValue>;
  generateTestReport(arg: Protocol.Page.generateTestReportParameters): Promise<Protocol.Page.generateTestReportReturnValue>;
  waitForDebugger(arg: Protocol.Page.waitForDebuggerParameters): Promise<Protocol.Page.waitForDebuggerReturnValue>;
  setInterceptFileChooserDialog(arg: Protocol.Page.setInterceptFileChooserDialogParameters): Promise<Protocol.Page.setInterceptFileChooserDialogReturnValue>;
}

export const IPage = genInjectID<IPage>()

export interface IPerformance {
  disable(arg: Protocol.Performance.disableParameters): Promise<Protocol.Performance.disableReturnValue>;
  enable(arg: Protocol.Performance.enableParameters): Promise<Protocol.Performance.enableReturnValue>;
  setTimeDomain(arg: Protocol.Performance.setTimeDomainParameters): Promise<Protocol.Performance.setTimeDomainReturnValue>;
  getMetrics(arg: Protocol.Performance.getMetricsParameters): Promise<Protocol.Performance.getMetricsReturnValue>;
}

export const IPerformance = genInjectID<IPerformance>()

export interface IPerformanceTimeline {
  enable(arg: Protocol.PerformanceTimeline.enableParameters): Promise<Protocol.PerformanceTimeline.enableReturnValue>;
}

export const IPerformanceTimeline = genInjectID<IPerformanceTimeline>()

export interface ISecurity {
  disable(arg: Protocol.Security.disableParameters): Promise<Protocol.Security.disableReturnValue>;
  enable(arg: Protocol.Security.enableParameters): Promise<Protocol.Security.enableReturnValue>;
  setIgnoreCertificateErrors(arg: Protocol.Security.setIgnoreCertificateErrorsParameters): Promise<Protocol.Security.setIgnoreCertificateErrorsReturnValue>;
  handleCertificateError(arg: Protocol.Security.handleCertificateErrorParameters): Promise<Protocol.Security.handleCertificateErrorReturnValue>;
  setOverrideCertificateErrors(arg: Protocol.Security.setOverrideCertificateErrorsParameters): Promise<Protocol.Security.setOverrideCertificateErrorsReturnValue>;
}

export const ISecurity = genInjectID<ISecurity>()

export interface IServiceWorker {
  deliverPushMessage(arg: Protocol.ServiceWorker.deliverPushMessageParameters): Promise<Protocol.ServiceWorker.deliverPushMessageReturnValue>;
  disable(arg: Protocol.ServiceWorker.disableParameters): Promise<Protocol.ServiceWorker.disableReturnValue>;
  dispatchSyncEvent(arg: Protocol.ServiceWorker.dispatchSyncEventParameters): Promise<Protocol.ServiceWorker.dispatchSyncEventReturnValue>;
  dispatchPeriodicSyncEvent(arg: Protocol.ServiceWorker.dispatchPeriodicSyncEventParameters): Promise<Protocol.ServiceWorker.dispatchPeriodicSyncEventReturnValue>;
  enable(arg: Protocol.ServiceWorker.enableParameters): Promise<Protocol.ServiceWorker.enableReturnValue>;
  inspectWorker(arg: Protocol.ServiceWorker.inspectWorkerParameters): Promise<Protocol.ServiceWorker.inspectWorkerReturnValue>;
  setForceUpdateOnPageLoad(arg: Protocol.ServiceWorker.setForceUpdateOnPageLoadParameters): Promise<Protocol.ServiceWorker.setForceUpdateOnPageLoadReturnValue>;
  skipWaiting(arg: Protocol.ServiceWorker.skipWaitingParameters): Promise<Protocol.ServiceWorker.skipWaitingReturnValue>;
  startWorker(arg: Protocol.ServiceWorker.startWorkerParameters): Promise<Protocol.ServiceWorker.startWorkerReturnValue>;
  stopAllWorkers(arg: Protocol.ServiceWorker.stopAllWorkersParameters): Promise<Protocol.ServiceWorker.stopAllWorkersReturnValue>;
  stopWorker(arg: Protocol.ServiceWorker.stopWorkerParameters): Promise<Protocol.ServiceWorker.stopWorkerReturnValue>;
  unregister(arg: Protocol.ServiceWorker.unregisterParameters): Promise<Protocol.ServiceWorker.unregisterReturnValue>;
  updateRegistration(arg: Protocol.ServiceWorker.updateRegistrationParameters): Promise<Protocol.ServiceWorker.updateRegistrationReturnValue>;
}

export const IServiceWorker = genInjectID<IServiceWorker>()

export interface IStorage {
  getStorageKeyForFrame(arg: Protocol.Storage.getStorageKeyForFrameParameters): Promise<Protocol.Storage.getStorageKeyForFrameReturnValue>;
  clearDataForOrigin(arg: Protocol.Storage.clearDataForOriginParameters): Promise<Protocol.Storage.clearDataForOriginReturnValue>;
  clearDataForStorageKey(arg: Protocol.Storage.clearDataForStorageKeyParameters): Promise<Protocol.Storage.clearDataForStorageKeyReturnValue>;
  getCookies(arg: Protocol.Storage.getCookiesParameters): Promise<Protocol.Storage.getCookiesReturnValue>;
  setCookies(arg: Protocol.Storage.setCookiesParameters): Promise<Protocol.Storage.setCookiesReturnValue>;
  clearCookies(arg: Protocol.Storage.clearCookiesParameters): Promise<Protocol.Storage.clearCookiesReturnValue>;
  getUsageAndQuota(arg: Protocol.Storage.getUsageAndQuotaParameters): Promise<Protocol.Storage.getUsageAndQuotaReturnValue>;
  overrideQuotaForOrigin(arg: Protocol.Storage.overrideQuotaForOriginParameters): Promise<Protocol.Storage.overrideQuotaForOriginReturnValue>;
  trackCacheStorageForOrigin(arg: Protocol.Storage.trackCacheStorageForOriginParameters): Promise<Protocol.Storage.trackCacheStorageForOriginReturnValue>;
  trackIndexedDBForOrigin(arg: Protocol.Storage.trackIndexedDBForOriginParameters): Promise<Protocol.Storage.trackIndexedDBForOriginReturnValue>;
  untrackCacheStorageForOrigin(arg: Protocol.Storage.untrackCacheStorageForOriginParameters): Promise<Protocol.Storage.untrackCacheStorageForOriginReturnValue>;
  untrackIndexedDBForOrigin(arg: Protocol.Storage.untrackIndexedDBForOriginParameters): Promise<Protocol.Storage.untrackIndexedDBForOriginReturnValue>;
  getTrustTokens(arg: Protocol.Storage.getTrustTokensParameters): Promise<Protocol.Storage.getTrustTokensReturnValue>;
  clearTrustTokens(arg: Protocol.Storage.clearTrustTokensParameters): Promise<Protocol.Storage.clearTrustTokensReturnValue>;
  getInterestGroupDetails(arg: Protocol.Storage.getInterestGroupDetailsParameters): Promise<Protocol.Storage.getInterestGroupDetailsReturnValue>;
  setInterestGroupTracking(arg: Protocol.Storage.setInterestGroupTrackingParameters): Promise<Protocol.Storage.setInterestGroupTrackingReturnValue>;
}

export const IStorage = genInjectID<IStorage>()

export interface ISystemInfo {
  getInfo(arg: Protocol.SystemInfo.getInfoParameters): Promise<Protocol.SystemInfo.getInfoReturnValue>;
  getProcessInfo(arg: Protocol.SystemInfo.getProcessInfoParameters): Promise<Protocol.SystemInfo.getProcessInfoReturnValue>;
}

export const ISystemInfo = genInjectID<ISystemInfo>()

export interface ITarget {
  activateTarget(arg: Protocol.Target.activateTargetParameters): Promise<Protocol.Target.activateTargetReturnValue>;
  attachToTarget(arg: Protocol.Target.attachToTargetParameters): Promise<Protocol.Target.attachToTargetReturnValue>;
  attachToBrowserTarget(arg: Protocol.Target.attachToBrowserTargetParameters): Promise<Protocol.Target.attachToBrowserTargetReturnValue>;
  closeTarget(arg: Protocol.Target.closeTargetParameters): Promise<Protocol.Target.closeTargetReturnValue>;
  exposeDevToolsProtocol(arg: Protocol.Target.exposeDevToolsProtocolParameters): Promise<Protocol.Target.exposeDevToolsProtocolReturnValue>;
  createBrowserContext(arg: Protocol.Target.createBrowserContextParameters): Promise<Protocol.Target.createBrowserContextReturnValue>;
  getBrowserContexts(arg: Protocol.Target.getBrowserContextsParameters): Promise<Protocol.Target.getBrowserContextsReturnValue>;
  createTarget(arg: Protocol.Target.createTargetParameters): Promise<Protocol.Target.createTargetReturnValue>;
  detachFromTarget(arg: Protocol.Target.detachFromTargetParameters): Promise<Protocol.Target.detachFromTargetReturnValue>;
  disposeBrowserContext(arg: Protocol.Target.disposeBrowserContextParameters): Promise<Protocol.Target.disposeBrowserContextReturnValue>;
  getTargetInfo(arg: Protocol.Target.getTargetInfoParameters): Promise<Protocol.Target.getTargetInfoReturnValue>;
  getTargets(arg: Protocol.Target.getTargetsParameters): Promise<Protocol.Target.getTargetsReturnValue>;
  sendMessageToTarget(arg: Protocol.Target.sendMessageToTargetParameters): Promise<Protocol.Target.sendMessageToTargetReturnValue>;
  setAutoAttach(arg: Protocol.Target.setAutoAttachParameters): Promise<Protocol.Target.setAutoAttachReturnValue>;
  autoAttachRelated(arg: Protocol.Target.autoAttachRelatedParameters): Promise<Protocol.Target.autoAttachRelatedReturnValue>;
  setDiscoverTargets(arg: Protocol.Target.setDiscoverTargetsParameters): Promise<Protocol.Target.setDiscoverTargetsReturnValue>;
  setRemoteLocations(arg: Protocol.Target.setRemoteLocationsParameters): Promise<Protocol.Target.setRemoteLocationsReturnValue>;
}

export const ITarget = genInjectID<ITarget>()

export interface ITethering {
  bind(arg: Protocol.Tethering.bindParameters): Promise<Protocol.Tethering.bindReturnValue>;
  unbind(arg: Protocol.Tethering.unbindParameters): Promise<Protocol.Tethering.unbindReturnValue>;
}

export const ITethering = genInjectID<ITethering>()

export interface ITracing {
  end(arg: Protocol.Tracing.endParameters): Promise<Protocol.Tracing.endReturnValue>;
  getCategories(arg: Protocol.Tracing.getCategoriesParameters): Promise<Protocol.Tracing.getCategoriesReturnValue>;
  recordClockSyncMarker(arg: Protocol.Tracing.recordClockSyncMarkerParameters): Promise<Protocol.Tracing.recordClockSyncMarkerReturnValue>;
  requestMemoryDump(arg: Protocol.Tracing.requestMemoryDumpParameters): Promise<Protocol.Tracing.requestMemoryDumpReturnValue>;
  start(arg: Protocol.Tracing.startParameters): Promise<Protocol.Tracing.startReturnValue>;
}

export const ITracing = genInjectID<ITracing>()

export interface IFetch {
  disable(arg: Protocol.Fetch.disableParameters): Promise<Protocol.Fetch.disableReturnValue>;
  enable(arg: Protocol.Fetch.enableParameters): Promise<Protocol.Fetch.enableReturnValue>;
  failRequest(arg: Protocol.Fetch.failRequestParameters): Promise<Protocol.Fetch.failRequestReturnValue>;
  fulfillRequest(arg: Protocol.Fetch.fulfillRequestParameters): Promise<Protocol.Fetch.fulfillRequestReturnValue>;
  continueRequest(arg: Protocol.Fetch.continueRequestParameters): Promise<Protocol.Fetch.continueRequestReturnValue>;
  continueWithAuth(arg: Protocol.Fetch.continueWithAuthParameters): Promise<Protocol.Fetch.continueWithAuthReturnValue>;
  continueResponse(arg: Protocol.Fetch.continueResponseParameters): Promise<Protocol.Fetch.continueResponseReturnValue>;
  getResponseBody(arg: Protocol.Fetch.getResponseBodyParameters): Promise<Protocol.Fetch.getResponseBodyReturnValue>;
  takeResponseBodyAsStream(arg: Protocol.Fetch.takeResponseBodyAsStreamParameters): Promise<Protocol.Fetch.takeResponseBodyAsStreamReturnValue>;
}

export const IFetch = genInjectID<IFetch>()

export interface IWebAudio {
  enable(arg: Protocol.WebAudio.enableParameters): Promise<Protocol.WebAudio.enableReturnValue>;
  disable(arg: Protocol.WebAudio.disableParameters): Promise<Protocol.WebAudio.disableReturnValue>;
  getRealtimeData(arg: Protocol.WebAudio.getRealtimeDataParameters): Promise<Protocol.WebAudio.getRealtimeDataReturnValue>;
}

export const IWebAudio = genInjectID<IWebAudio>()

export interface IWebAuthn {
  enable(arg: Protocol.WebAuthn.enableParameters): Promise<Protocol.WebAuthn.enableReturnValue>;
  disable(arg: Protocol.WebAuthn.disableParameters): Promise<Protocol.WebAuthn.disableReturnValue>;
  addVirtualAuthenticator(arg: Protocol.WebAuthn.addVirtualAuthenticatorParameters): Promise<Protocol.WebAuthn.addVirtualAuthenticatorReturnValue>;
  removeVirtualAuthenticator(arg: Protocol.WebAuthn.removeVirtualAuthenticatorParameters): Promise<Protocol.WebAuthn.removeVirtualAuthenticatorReturnValue>;
  addCredential(arg: Protocol.WebAuthn.addCredentialParameters): Promise<Protocol.WebAuthn.addCredentialReturnValue>;
  getCredential(arg: Protocol.WebAuthn.getCredentialParameters): Promise<Protocol.WebAuthn.getCredentialReturnValue>;
  getCredentials(arg: Protocol.WebAuthn.getCredentialsParameters): Promise<Protocol.WebAuthn.getCredentialsReturnValue>;
  removeCredential(arg: Protocol.WebAuthn.removeCredentialParameters): Promise<Protocol.WebAuthn.removeCredentialReturnValue>;
  clearCredentials(arg: Protocol.WebAuthn.clearCredentialsParameters): Promise<Protocol.WebAuthn.clearCredentialsReturnValue>;
  setUserVerified(arg: Protocol.WebAuthn.setUserVerifiedParameters): Promise<Protocol.WebAuthn.setUserVerifiedReturnValue>;
  setAutomaticPresenceSimulation(arg: Protocol.WebAuthn.setAutomaticPresenceSimulationParameters): Promise<Protocol.WebAuthn.setAutomaticPresenceSimulationReturnValue>;
}

export const IWebAuthn = genInjectID<IWebAuthn>()

export interface IMedia {
  enable(arg: Protocol.Media.enableParameters): Promise<Protocol.Media.enableReturnValue>;
  disable(arg: Protocol.Media.disableParameters): Promise<Protocol.Media.disableReturnValue>;
}

export const IMedia = genInjectID<IMedia>()

export interface IConsole {
  clearMessages(arg: Protocol.Console.clearMessagesParameters): Promise<Protocol.Console.clearMessagesReturnValue>;
  disable(arg: Protocol.Console.disableParameters): Promise<Protocol.Console.disableReturnValue>;
  enable(arg: Protocol.Console.enableParameters): Promise<Protocol.Console.enableReturnValue>;
}

export const IConsole = genInjectID<IConsole>()

export interface IDebugger {
  continueToLocation(arg: Protocol.Debugger.continueToLocationParameters): Promise<Protocol.Debugger.continueToLocationReturnValue>;
  disable(arg: Protocol.Debugger.disableParameters): Promise<Protocol.Debugger.disableReturnValue>;
  enable(arg: Protocol.Debugger.enableParameters): Promise<Protocol.Debugger.enableReturnValue>;
  evaluateOnCallFrame(arg: Protocol.Debugger.evaluateOnCallFrameParameters): Promise<Protocol.Debugger.evaluateOnCallFrameReturnValue>;
  getPossibleBreakpoints(arg: Protocol.Debugger.getPossibleBreakpointsParameters): Promise<Protocol.Debugger.getPossibleBreakpointsReturnValue>;
  getScriptSource(arg: Protocol.Debugger.getScriptSourceParameters): Promise<Protocol.Debugger.getScriptSourceReturnValue>;
  disassembleWasmModule(arg: Protocol.Debugger.disassembleWasmModuleParameters): Promise<Protocol.Debugger.disassembleWasmModuleReturnValue>;
  nextWasmDisassemblyChunk(arg: Protocol.Debugger.nextWasmDisassemblyChunkParameters): Promise<Protocol.Debugger.nextWasmDisassemblyChunkReturnValue>;
  getWasmBytecode(arg: Protocol.Debugger.getWasmBytecodeParameters): Promise<Protocol.Debugger.getWasmBytecodeReturnValue>;
  getStackTrace(arg: Protocol.Debugger.getStackTraceParameters): Promise<Protocol.Debugger.getStackTraceReturnValue>;
  pause(arg: Protocol.Debugger.pauseParameters): Promise<Protocol.Debugger.pauseReturnValue>;
  pauseOnAsyncCall(arg: Protocol.Debugger.pauseOnAsyncCallParameters): Promise<Protocol.Debugger.pauseOnAsyncCallReturnValue>;
  removeBreakpoint(arg: Protocol.Debugger.removeBreakpointParameters): Promise<Protocol.Debugger.removeBreakpointReturnValue>;
  restartFrame(arg: Protocol.Debugger.restartFrameParameters): Promise<Protocol.Debugger.restartFrameReturnValue>;
  resume(arg: Protocol.Debugger.resumeParameters): Promise<Protocol.Debugger.resumeReturnValue>;
  searchInContent(arg: Protocol.Debugger.searchInContentParameters): Promise<Protocol.Debugger.searchInContentReturnValue>;
  setAsyncCallStackDepth(arg: Protocol.Debugger.setAsyncCallStackDepthParameters): Promise<Protocol.Debugger.setAsyncCallStackDepthReturnValue>;
  setBlackboxPatterns(arg: Protocol.Debugger.setBlackboxPatternsParameters): Promise<Protocol.Debugger.setBlackboxPatternsReturnValue>;
  setBlackboxedRanges(arg: Protocol.Debugger.setBlackboxedRangesParameters): Promise<Protocol.Debugger.setBlackboxedRangesReturnValue>;
  setBreakpoint(arg: Protocol.Debugger.setBreakpointParameters): Promise<Protocol.Debugger.setBreakpointReturnValue>;
  setInstrumentationBreakpoint(arg: Protocol.Debugger.setInstrumentationBreakpointParameters): Promise<Protocol.Debugger.setInstrumentationBreakpointReturnValue>;
  setBreakpointByUrl(arg: Protocol.Debugger.setBreakpointByUrlParameters): Promise<Protocol.Debugger.setBreakpointByUrlReturnValue>;
  setBreakpointOnFunctionCall(arg: Protocol.Debugger.setBreakpointOnFunctionCallParameters): Promise<Protocol.Debugger.setBreakpointOnFunctionCallReturnValue>;
  setBreakpointsActive(arg: Protocol.Debugger.setBreakpointsActiveParameters): Promise<Protocol.Debugger.setBreakpointsActiveReturnValue>;
  setPauseOnExceptions(arg: Protocol.Debugger.setPauseOnExceptionsParameters): Promise<Protocol.Debugger.setPauseOnExceptionsReturnValue>;
  setReturnValue(arg: Protocol.Debugger.setReturnValueParameters): Promise<Protocol.Debugger.setReturnValueReturnValue>;
  setScriptSource(arg: Protocol.Debugger.setScriptSourceParameters): Promise<Protocol.Debugger.setScriptSourceReturnValue>;
  setSkipAllPauses(arg: Protocol.Debugger.setSkipAllPausesParameters): Promise<Protocol.Debugger.setSkipAllPausesReturnValue>;
  setVariableValue(arg: Protocol.Debugger.setVariableValueParameters): Promise<Protocol.Debugger.setVariableValueReturnValue>;
  stepInto(arg: Protocol.Debugger.stepIntoParameters): Promise<Protocol.Debugger.stepIntoReturnValue>;
  stepOut(arg: Protocol.Debugger.stepOutParameters): Promise<Protocol.Debugger.stepOutReturnValue>;
  stepOver(arg: Protocol.Debugger.stepOverParameters): Promise<Protocol.Debugger.stepOverReturnValue>;
}

export const IDebugger = genInjectID<IDebugger>()

export interface IHeapProfiler {
  addInspectedHeapObject(arg: Protocol.HeapProfiler.addInspectedHeapObjectParameters): Promise<Protocol.HeapProfiler.addInspectedHeapObjectReturnValue>;
  collectGarbage(arg: Protocol.HeapProfiler.collectGarbageParameters): Promise<Protocol.HeapProfiler.collectGarbageReturnValue>;
  disable(arg: Protocol.HeapProfiler.disableParameters): Promise<Protocol.HeapProfiler.disableReturnValue>;
  enable(arg: Protocol.HeapProfiler.enableParameters): Promise<Protocol.HeapProfiler.enableReturnValue>;
  getHeapObjectId(arg: Protocol.HeapProfiler.getHeapObjectIdParameters): Promise<Protocol.HeapProfiler.getHeapObjectIdReturnValue>;
  getObjectByHeapObjectId(arg: Protocol.HeapProfiler.getObjectByHeapObjectIdParameters): Promise<Protocol.HeapProfiler.getObjectByHeapObjectIdReturnValue>;
  getSamplingProfile(arg: Protocol.HeapProfiler.getSamplingProfileParameters): Promise<Protocol.HeapProfiler.getSamplingProfileReturnValue>;
  startSampling(arg: Protocol.HeapProfiler.startSamplingParameters): Promise<Protocol.HeapProfiler.startSamplingReturnValue>;
  startTrackingHeapObjects(arg: Protocol.HeapProfiler.startTrackingHeapObjectsParameters): Promise<Protocol.HeapProfiler.startTrackingHeapObjectsReturnValue>;
  stopSampling(arg: Protocol.HeapProfiler.stopSamplingParameters): Promise<Protocol.HeapProfiler.stopSamplingReturnValue>;
  stopTrackingHeapObjects(arg: Protocol.HeapProfiler.stopTrackingHeapObjectsParameters): Promise<Protocol.HeapProfiler.stopTrackingHeapObjectsReturnValue>;
  takeHeapSnapshot(arg: Protocol.HeapProfiler.takeHeapSnapshotParameters): Promise<Protocol.HeapProfiler.takeHeapSnapshotReturnValue>;
}

export const IHeapProfiler = genInjectID<IHeapProfiler>()

export interface IProfiler {
  disable(arg: Protocol.Profiler.disableParameters): Promise<Protocol.Profiler.disableReturnValue>;
  enable(arg: Protocol.Profiler.enableParameters): Promise<Protocol.Profiler.enableReturnValue>;
  getBestEffortCoverage(arg: Protocol.Profiler.getBestEffortCoverageParameters): Promise<Protocol.Profiler.getBestEffortCoverageReturnValue>;
  setSamplingInterval(arg: Protocol.Profiler.setSamplingIntervalParameters): Promise<Protocol.Profiler.setSamplingIntervalReturnValue>;
  start(arg: Protocol.Profiler.startParameters): Promise<Protocol.Profiler.startReturnValue>;
  startPreciseCoverage(arg: Protocol.Profiler.startPreciseCoverageParameters): Promise<Protocol.Profiler.startPreciseCoverageReturnValue>;
  startTypeProfile(arg: Protocol.Profiler.startTypeProfileParameters): Promise<Protocol.Profiler.startTypeProfileReturnValue>;
  stop(arg: Protocol.Profiler.stopParameters): Promise<Protocol.Profiler.stopReturnValue>;
  stopPreciseCoverage(arg: Protocol.Profiler.stopPreciseCoverageParameters): Promise<Protocol.Profiler.stopPreciseCoverageReturnValue>;
  stopTypeProfile(arg: Protocol.Profiler.stopTypeProfileParameters): Promise<Protocol.Profiler.stopTypeProfileReturnValue>;
  takePreciseCoverage(arg: Protocol.Profiler.takePreciseCoverageParameters): Promise<Protocol.Profiler.takePreciseCoverageReturnValue>;
  takeTypeProfile(arg: Protocol.Profiler.takeTypeProfileParameters): Promise<Protocol.Profiler.takeTypeProfileReturnValue>;
}

export const IProfiler = genInjectID<IProfiler>()

export interface IRuntime {
  awaitPromise(arg: Protocol.Runtime.awaitPromiseParameters): Promise<Protocol.Runtime.awaitPromiseReturnValue>;
  callFunctionOn(arg: Protocol.Runtime.callFunctionOnParameters): Promise<Protocol.Runtime.callFunctionOnReturnValue>;
  compileScript(arg: Protocol.Runtime.compileScriptParameters): Promise<Protocol.Runtime.compileScriptReturnValue>;
  disable(arg: Protocol.Runtime.disableParameters): Promise<Protocol.Runtime.disableReturnValue>;
  discardConsoleEntries(arg: Protocol.Runtime.discardConsoleEntriesParameters): Promise<Protocol.Runtime.discardConsoleEntriesReturnValue>;
  enable(arg: Protocol.Runtime.enableParameters): Promise<Protocol.Runtime.enableReturnValue>;
  evaluate(arg: Protocol.Runtime.evaluateParameters): Promise<Protocol.Runtime.evaluateReturnValue>;
  getIsolateId(arg: Protocol.Runtime.getIsolateIdParameters): Promise<Protocol.Runtime.getIsolateIdReturnValue>;
  getHeapUsage(arg: Protocol.Runtime.getHeapUsageParameters): Promise<Protocol.Runtime.getHeapUsageReturnValue>;
  getProperties(arg: Protocol.Runtime.getPropertiesParameters): Promise<Protocol.Runtime.getPropertiesReturnValue>;
  globalLexicalScopeNames(arg: Protocol.Runtime.globalLexicalScopeNamesParameters): Promise<Protocol.Runtime.globalLexicalScopeNamesReturnValue>;
  queryObjects(arg: Protocol.Runtime.queryObjectsParameters): Promise<Protocol.Runtime.queryObjectsReturnValue>;
  releaseObject(arg: Protocol.Runtime.releaseObjectParameters): Promise<Protocol.Runtime.releaseObjectReturnValue>;
  releaseObjectGroup(arg: Protocol.Runtime.releaseObjectGroupParameters): Promise<Protocol.Runtime.releaseObjectGroupReturnValue>;
  runIfWaitingForDebugger(arg: Protocol.Runtime.runIfWaitingForDebuggerParameters): Promise<Protocol.Runtime.runIfWaitingForDebuggerReturnValue>;
  runScript(arg: Protocol.Runtime.runScriptParameters): Promise<Protocol.Runtime.runScriptReturnValue>;
  setAsyncCallStackDepth(arg: Protocol.Runtime.setAsyncCallStackDepthParameters): Promise<Protocol.Runtime.setAsyncCallStackDepthReturnValue>;
  setCustomObjectFormatterEnabled(arg: Protocol.Runtime.setCustomObjectFormatterEnabledParameters): Promise<Protocol.Runtime.setCustomObjectFormatterEnabledReturnValue>;
  setMaxCallStackSizeToCapture(arg: Protocol.Runtime.setMaxCallStackSizeToCaptureParameters): Promise<Protocol.Runtime.setMaxCallStackSizeToCaptureReturnValue>;
  terminateExecution(arg: Protocol.Runtime.terminateExecutionParameters): Promise<Protocol.Runtime.terminateExecutionReturnValue>;
  addBinding(arg: Protocol.Runtime.addBindingParameters): Promise<Protocol.Runtime.addBindingReturnValue>;
  removeBinding(arg: Protocol.Runtime.removeBindingParameters): Promise<Protocol.Runtime.removeBindingReturnValue>;
  getExceptionDetails(arg: Protocol.Runtime.getExceptionDetailsParameters): Promise<Protocol.Runtime.getExceptionDetailsReturnValue>;
}

export const IRuntime = genInjectID<IRuntime>()

export interface ISchema {
  getDomains(arg: Protocol.Schema.getDomainsParameters): Promise<Protocol.Schema.getDomainsReturnValue>;
}

export const ISchema = genInjectID<ISchema>()

export const IServices = {
  IAccessibility,
  IAnimation,
  IAudits,
  IBackgroundService,
  IBrowser,
  ICSS,
  ICacheStorage,
  ICast,
  IDOM,
  IDOMDebugger,
  IEventBreakpoints,
  IDOMSnapshot,
  IDOMStorage,
  IDatabase,
  IDeviceOrientation,
  IEmulation,
  IHeadlessExperimental,
  IIO,
  IIndexedDB,
  IInput,
  IInspector,
  ILayerTree,
  ILog,
  IMemory,
  INetwork,
  IOverlay,
  IPage,
  IPerformance,
  IPerformanceTimeline,
  ISecurity,
  IServiceWorker,
  IStorage,
  ISystemInfo,
  ITarget,
  ITethering,
  ITracing,
  IFetch,
  IWebAudio,
  IWebAuthn,
  IMedia,
  IConsole,
  IDebugger,
  IHeapProfiler,
  IProfiler,
  IRuntime,
  ISchema,
};

export function registerCmds(backend: {registerCommand: (cmd: any) => void}) {
  backend.registerCommand('Accessibility.disable');
  backend.registerCommand('Accessibility.enable');
  backend.registerCommand('Accessibility.getPartialAXTree');
  backend.registerCommand('Accessibility.getFullAXTree');
  backend.registerCommand('Accessibility.getRootAXNode');
  backend.registerCommand('Accessibility.getAXNodeAndAncestors');
  backend.registerCommand('Accessibility.getChildAXNodes');
  backend.registerCommand('Accessibility.queryAXTree');
  backend.registerCommand('Animation.disable');
  backend.registerCommand('Animation.enable');
  backend.registerCommand('Animation.getCurrentTime');
  backend.registerCommand('Animation.getPlaybackRate');
  backend.registerCommand('Animation.releaseAnimations');
  backend.registerCommand('Animation.resolveAnimation');
  backend.registerCommand('Animation.seekAnimations');
  backend.registerCommand('Animation.setPaused');
  backend.registerCommand('Animation.setPlaybackRate');
  backend.registerCommand('Animation.setTiming');
  backend.registerCommand('Audits.getEncodedResponse');
  backend.registerCommand('Audits.disable');
  backend.registerCommand('Audits.enable');
  backend.registerCommand('Audits.checkContrast');
  backend.registerCommand('BackgroundService.startObserving');
  backend.registerCommand('BackgroundService.stopObserving');
  backend.registerCommand('BackgroundService.setRecording');
  backend.registerCommand('BackgroundService.clearEvents');
  backend.registerCommand('Browser.setPermission');
  backend.registerCommand('Browser.grantPermissions');
  backend.registerCommand('Browser.resetPermissions');
  backend.registerCommand('Browser.setDownloadBehavior');
  backend.registerCommand('Browser.cancelDownload');
  backend.registerCommand('Browser.close');
  backend.registerCommand('Browser.crash');
  backend.registerCommand('Browser.crashGpuProcess');
  backend.registerCommand('Browser.getVersion');
  backend.registerCommand('Browser.getBrowserCommandLine');
  backend.registerCommand('Browser.getHistograms');
  backend.registerCommand('Browser.getHistogram');
  backend.registerCommand('Browser.getWindowBounds');
  backend.registerCommand('Browser.getWindowForTarget');
  backend.registerCommand('Browser.setWindowBounds');
  backend.registerCommand('Browser.setDockTile');
  backend.registerCommand('Browser.executeBrowserCommand');
  backend.registerCommand('CSS.addRule');
  backend.registerCommand('CSS.collectClassNames');
  backend.registerCommand('CSS.createStyleSheet');
  backend.registerCommand('CSS.disable');
  backend.registerCommand('CSS.enable');
  backend.registerCommand('CSS.forcePseudoState');
  backend.registerCommand('CSS.getBackgroundColors');
  backend.registerCommand('CSS.getComputedStyleForNode');
  backend.registerCommand('CSS.getInlineStylesForNode');
  backend.registerCommand('CSS.getMatchedStylesForNode');
  backend.registerCommand('CSS.getMediaQueries');
  backend.registerCommand('CSS.getPlatformFontsForNode');
  backend.registerCommand('CSS.getStyleSheetText');
  backend.registerCommand('CSS.getLayersForNode');
  backend.registerCommand('CSS.trackComputedStyleUpdates');
  backend.registerCommand('CSS.takeComputedStyleUpdates');
  backend.registerCommand('CSS.setEffectivePropertyValueForNode');
  backend.registerCommand('CSS.setKeyframeKey');
  backend.registerCommand('CSS.setMediaText');
  backend.registerCommand('CSS.setContainerQueryText');
  backend.registerCommand('CSS.setSupportsText');
  backend.registerCommand('CSS.setScopeText');
  backend.registerCommand('CSS.setRuleSelector');
  backend.registerCommand('CSS.setStyleSheetText');
  backend.registerCommand('CSS.setStyleTexts');
  backend.registerCommand('CSS.startRuleUsageTracking');
  backend.registerCommand('CSS.stopRuleUsageTracking');
  backend.registerCommand('CSS.takeCoverageDelta');
  backend.registerCommand('CSS.setLocalFontsEnabled');
  backend.registerCommand('CacheStorage.deleteCache');
  backend.registerCommand('CacheStorage.deleteEntry');
  backend.registerCommand('CacheStorage.requestCacheNames');
  backend.registerCommand('CacheStorage.requestCachedResponse');
  backend.registerCommand('CacheStorage.requestEntries');
  backend.registerCommand('Cast.enable');
  backend.registerCommand('Cast.disable');
  backend.registerCommand('Cast.setSinkToUse');
  backend.registerCommand('Cast.startDesktopMirroring');
  backend.registerCommand('Cast.startTabMirroring');
  backend.registerCommand('Cast.stopCasting');
  backend.registerCommand('DOM.collectClassNamesFromSubtree');
  backend.registerCommand('DOM.copyTo');
  backend.registerCommand('DOM.describeNode');
  backend.registerCommand('DOM.scrollIntoViewIfNeeded');
  backend.registerCommand('DOM.disable');
  backend.registerCommand('DOM.discardSearchResults');
  backend.registerCommand('DOM.enable');
  backend.registerCommand('DOM.focus');
  backend.registerCommand('DOM.getAttributes');
  backend.registerCommand('DOM.getBoxModel');
  backend.registerCommand('DOM.getContentQuads');
  backend.registerCommand('DOM.getDocument');
  backend.registerCommand('DOM.getFlattenedDocument');
  backend.registerCommand('DOM.getNodesForSubtreeByStyle');
  backend.registerCommand('DOM.getNodeForLocation');
  backend.registerCommand('DOM.getOuterHTML');
  backend.registerCommand('DOM.getRelayoutBoundary');
  backend.registerCommand('DOM.getSearchResults');
  backend.registerCommand('DOM.hideHighlight');
  backend.registerCommand('DOM.highlightNode');
  backend.registerCommand('DOM.highlightRect');
  backend.registerCommand('DOM.markUndoableState');
  backend.registerCommand('DOM.moveTo');
  backend.registerCommand('DOM.performSearch');
  backend.registerCommand('DOM.pushNodeByPathToFrontend');
  backend.registerCommand('DOM.pushNodesByBackendIdsToFrontend');
  backend.registerCommand('DOM.querySelector');
  backend.registerCommand('DOM.querySelectorAll');
  backend.registerCommand('DOM.getTopLayerElements');
  backend.registerCommand('DOM.redo');
  backend.registerCommand('DOM.removeAttribute');
  backend.registerCommand('DOM.removeNode');
  backend.registerCommand('DOM.requestChildNodes');
  backend.registerCommand('DOM.requestNode');
  backend.registerCommand('DOM.resolveNode');
  backend.registerCommand('DOM.setAttributeValue');
  backend.registerCommand('DOM.setAttributesAsText');
  backend.registerCommand('DOM.setFileInputFiles');
  backend.registerCommand('DOM.setNodeStackTracesEnabled');
  backend.registerCommand('DOM.getNodeStackTraces');
  backend.registerCommand('DOM.getFileInfo');
  backend.registerCommand('DOM.setInspectedNode');
  backend.registerCommand('DOM.setNodeName');
  backend.registerCommand('DOM.setNodeValue');
  backend.registerCommand('DOM.setOuterHTML');
  backend.registerCommand('DOM.undo');
  backend.registerCommand('DOM.getFrameOwner');
  backend.registerCommand('DOM.getContainerForNode');
  backend.registerCommand('DOM.getQueryingDescendantsForContainer');
  backend.registerCommand('DOMDebugger.getEventListeners');
  backend.registerCommand('DOMDebugger.removeDOMBreakpoint');
  backend.registerCommand('DOMDebugger.removeEventListenerBreakpoint');
  backend.registerCommand('DOMDebugger.removeInstrumentationBreakpoint');
  backend.registerCommand('DOMDebugger.removeXHRBreakpoint');
  backend.registerCommand('DOMDebugger.setBreakOnCSPViolation');
  backend.registerCommand('DOMDebugger.setDOMBreakpoint');
  backend.registerCommand('DOMDebugger.setEventListenerBreakpoint');
  backend.registerCommand('DOMDebugger.setInstrumentationBreakpoint');
  backend.registerCommand('DOMDebugger.setXHRBreakpoint');
  backend.registerCommand('EventBreakpoints.setInstrumentationBreakpoint');
  backend.registerCommand('EventBreakpoints.removeInstrumentationBreakpoint');
  backend.registerCommand('DOMSnapshot.disable');
  backend.registerCommand('DOMSnapshot.enable');
  backend.registerCommand('DOMSnapshot.getSnapshot');
  backend.registerCommand('DOMSnapshot.captureSnapshot');
  backend.registerCommand('DOMStorage.clear');
  backend.registerCommand('DOMStorage.disable');
  backend.registerCommand('DOMStorage.enable');
  backend.registerCommand('DOMStorage.getDOMStorageItems');
  backend.registerCommand('DOMStorage.removeDOMStorageItem');
  backend.registerCommand('DOMStorage.setDOMStorageItem');
  backend.registerCommand('Database.disable');
  backend.registerCommand('Database.enable');
  backend.registerCommand('Database.executeSQL');
  backend.registerCommand('Database.getDatabaseTableNames');
  backend.registerCommand('DeviceOrientation.clearDeviceOrientationOverride');
  backend.registerCommand('DeviceOrientation.setDeviceOrientationOverride');
  backend.registerCommand('Emulation.canEmulate');
  backend.registerCommand('Emulation.clearDeviceMetricsOverride');
  backend.registerCommand('Emulation.clearGeolocationOverride');
  backend.registerCommand('Emulation.resetPageScaleFactor');
  backend.registerCommand('Emulation.setFocusEmulationEnabled');
  backend.registerCommand('Emulation.setAutoDarkModeOverride');
  backend.registerCommand('Emulation.setCPUThrottlingRate');
  backend.registerCommand('Emulation.setDefaultBackgroundColorOverride');
  backend.registerCommand('Emulation.setDeviceMetricsOverride');
  backend.registerCommand('Emulation.setScrollbarsHidden');
  backend.registerCommand('Emulation.setDocumentCookieDisabled');
  backend.registerCommand('Emulation.setEmitTouchEventsForMouse');
  backend.registerCommand('Emulation.setEmulatedMedia');
  backend.registerCommand('Emulation.setEmulatedVisionDeficiency');
  backend.registerCommand('Emulation.setGeolocationOverride');
  backend.registerCommand('Emulation.setIdleOverride');
  backend.registerCommand('Emulation.clearIdleOverride');
  backend.registerCommand('Emulation.setNavigatorOverrides');
  backend.registerCommand('Emulation.setPageScaleFactor');
  backend.registerCommand('Emulation.setScriptExecutionDisabled');
  backend.registerCommand('Emulation.setTouchEmulationEnabled');
  backend.registerCommand('Emulation.setVirtualTimePolicy');
  backend.registerCommand('Emulation.setLocaleOverride');
  backend.registerCommand('Emulation.setTimezoneOverride');
  backend.registerCommand('Emulation.setVisibleSize');
  backend.registerCommand('Emulation.setDisabledImageTypes');
  backend.registerCommand('Emulation.setHardwareConcurrencyOverride');
  backend.registerCommand('Emulation.setUserAgentOverride');
  backend.registerCommand('Emulation.setAutomationOverride');
  backend.registerCommand('HeadlessExperimental.beginFrame');
  backend.registerCommand('HeadlessExperimental.disable');
  backend.registerCommand('HeadlessExperimental.enable');
  backend.registerCommand('IO.close');
  backend.registerCommand('IO.read');
  backend.registerCommand('IO.resolveBlob');
  backend.registerCommand('IndexedDB.clearObjectStore');
  backend.registerCommand('IndexedDB.deleteDatabase');
  backend.registerCommand('IndexedDB.deleteObjectStoreEntries');
  backend.registerCommand('IndexedDB.disable');
  backend.registerCommand('IndexedDB.enable');
  backend.registerCommand('IndexedDB.requestData');
  backend.registerCommand('IndexedDB.getMetadata');
  backend.registerCommand('IndexedDB.requestDatabase');
  backend.registerCommand('IndexedDB.requestDatabaseNames');
  backend.registerCommand('Input.dispatchDragEvent');
  backend.registerCommand('Input.dispatchKeyEvent');
  backend.registerCommand('Input.insertText');
  backend.registerCommand('Input.imeSetComposition');
  backend.registerCommand('Input.dispatchMouseEvent');
  backend.registerCommand('Input.dispatchTouchEvent');
  backend.registerCommand('Input.emulateTouchFromMouseEvent');
  backend.registerCommand('Input.setIgnoreInputEvents');
  backend.registerCommand('Input.setInterceptDrags');
  backend.registerCommand('Input.synthesizePinchGesture');
  backend.registerCommand('Input.synthesizeScrollGesture');
  backend.registerCommand('Input.synthesizeTapGesture');
  backend.registerCommand('Inspector.disable');
  backend.registerCommand('Inspector.enable');
  backend.registerCommand('LayerTree.compositingReasons');
  backend.registerCommand('LayerTree.disable');
  backend.registerCommand('LayerTree.enable');
  backend.registerCommand('LayerTree.loadSnapshot');
  backend.registerCommand('LayerTree.makeSnapshot');
  backend.registerCommand('LayerTree.profileSnapshot');
  backend.registerCommand('LayerTree.releaseSnapshot');
  backend.registerCommand('LayerTree.replaySnapshot');
  backend.registerCommand('LayerTree.snapshotCommandLog');
  backend.registerCommand('Log.clear');
  backend.registerCommand('Log.disable');
  backend.registerCommand('Log.enable');
  backend.registerCommand('Log.startViolationsReport');
  backend.registerCommand('Log.stopViolationsReport');
  backend.registerCommand('Memory.getDOMCounters');
  backend.registerCommand('Memory.prepareForLeakDetection');
  backend.registerCommand('Memory.forciblyPurgeJavaScriptMemory');
  backend.registerCommand('Memory.setPressureNotificationsSuppressed');
  backend.registerCommand('Memory.simulatePressureNotification');
  backend.registerCommand('Memory.startSampling');
  backend.registerCommand('Memory.stopSampling');
  backend.registerCommand('Memory.getAllTimeSamplingProfile');
  backend.registerCommand('Memory.getBrowserSamplingProfile');
  backend.registerCommand('Memory.getSamplingProfile');
  backend.registerCommand('Network.setAcceptedEncodings');
  backend.registerCommand('Network.clearAcceptedEncodingsOverride');
  backend.registerCommand('Network.canClearBrowserCache');
  backend.registerCommand('Network.canClearBrowserCookies');
  backend.registerCommand('Network.canEmulateNetworkConditions');
  backend.registerCommand('Network.clearBrowserCache');
  backend.registerCommand('Network.clearBrowserCookies');
  backend.registerCommand('Network.continueInterceptedRequest');
  backend.registerCommand('Network.deleteCookies');
  backend.registerCommand('Network.disable');
  backend.registerCommand('Network.emulateNetworkConditions');
  backend.registerCommand('Network.enable');
  backend.registerCommand('Network.getAllCookies');
  backend.registerCommand('Network.getCertificate');
  backend.registerCommand('Network.getCookies');
  backend.registerCommand('Network.getResponseBody');
  backend.registerCommand('Network.getRequestPostData');
  backend.registerCommand('Network.getResponseBodyForInterception');
  backend.registerCommand('Network.takeResponseBodyForInterceptionAsStream');
  backend.registerCommand('Network.replayXHR');
  backend.registerCommand('Network.searchInResponseBody');
  backend.registerCommand('Network.setBlockedURLs');
  backend.registerCommand('Network.setBypassServiceWorker');
  backend.registerCommand('Network.setCacheDisabled');
  backend.registerCommand('Network.setCookie');
  backend.registerCommand('Network.setCookies');
  backend.registerCommand('Network.setExtraHTTPHeaders');
  backend.registerCommand('Network.setAttachDebugStack');
  backend.registerCommand('Network.setRequestInterception');
  backend.registerCommand('Network.setUserAgentOverride');
  backend.registerCommand('Network.getSecurityIsolationStatus');
  backend.registerCommand('Network.enableReportingApi');
  backend.registerCommand('Network.loadNetworkResource');
  backend.registerCommand('Overlay.disable');
  backend.registerCommand('Overlay.enable');
  backend.registerCommand('Overlay.getHighlightObjectForTest');
  backend.registerCommand('Overlay.getGridHighlightObjectsForTest');
  backend.registerCommand('Overlay.getSourceOrderHighlightObjectForTest');
  backend.registerCommand('Overlay.hideHighlight');
  backend.registerCommand('Overlay.highlightFrame');
  backend.registerCommand('Overlay.highlightNode');
  backend.registerCommand('Overlay.highlightQuad');
  backend.registerCommand('Overlay.highlightRect');
  backend.registerCommand('Overlay.highlightSourceOrder');
  backend.registerCommand('Overlay.setInspectMode');
  backend.registerCommand('Overlay.setShowAdHighlights');
  backend.registerCommand('Overlay.setPausedInDebuggerMessage');
  backend.registerCommand('Overlay.setShowDebugBorders');
  backend.registerCommand('Overlay.setShowFPSCounter');
  backend.registerCommand('Overlay.setShowGridOverlays');
  backend.registerCommand('Overlay.setShowFlexOverlays');
  backend.registerCommand('Overlay.setShowScrollSnapOverlays');
  backend.registerCommand('Overlay.setShowContainerQueryOverlays');
  backend.registerCommand('Overlay.setShowPaintRects');
  backend.registerCommand('Overlay.setShowLayoutShiftRegions');
  backend.registerCommand('Overlay.setShowScrollBottleneckRects');
  backend.registerCommand('Overlay.setShowHitTestBorders');
  backend.registerCommand('Overlay.setShowWebVitals');
  backend.registerCommand('Overlay.setShowViewportSizeOnResize');
  backend.registerCommand('Overlay.setShowHinge');
  backend.registerCommand('Overlay.setShowIsolatedElements');
  backend.registerCommand('Page.addScriptToEvaluateOnLoad');
  backend.registerCommand('Page.addScriptToEvaluateOnNewDocument');
  backend.registerCommand('Page.bringToFront');
  backend.registerCommand('Page.captureScreenshot');
  backend.registerCommand('Page.captureSnapshot');
  backend.registerCommand('Page.clearDeviceMetricsOverride');
  backend.registerCommand('Page.clearDeviceOrientationOverride');
  backend.registerCommand('Page.clearGeolocationOverride');
  backend.registerCommand('Page.createIsolatedWorld');
  backend.registerCommand('Page.deleteCookie');
  backend.registerCommand('Page.disable');
  backend.registerCommand('Page.enable');
  backend.registerCommand('Page.getAppManifest');
  backend.registerCommand('Page.getInstallabilityErrors');
  backend.registerCommand('Page.getManifestIcons');
  backend.registerCommand('Page.getAppId');
  backend.registerCommand('Page.getCookies');
  backend.registerCommand('Page.getFrameTree');
  backend.registerCommand('Page.getLayoutMetrics');
  backend.registerCommand('Page.getNavigationHistory');
  backend.registerCommand('Page.resetNavigationHistory');
  backend.registerCommand('Page.getResourceContent');
  backend.registerCommand('Page.getResourceTree');
  backend.registerCommand('Page.handleJavaScriptDialog');
  backend.registerCommand('Page.navigate');
  backend.registerCommand('Page.navigateToHistoryEntry');
  backend.registerCommand('Page.printToPDF');
  backend.registerCommand('Page.reload');
  backend.registerCommand('Page.removeScriptToEvaluateOnLoad');
  backend.registerCommand('Page.removeScriptToEvaluateOnNewDocument');
  backend.registerCommand('Page.screencastFrameAck');
  backend.registerCommand('Page.searchInResource');
  backend.registerCommand('Page.setAdBlockingEnabled');
  backend.registerCommand('Page.setBypassCSP');
  backend.registerCommand('Page.getPermissionsPolicyState');
  backend.registerCommand('Page.getOriginTrials');
  backend.registerCommand('Page.setDeviceMetricsOverride');
  backend.registerCommand('Page.setDeviceOrientationOverride');
  backend.registerCommand('Page.setFontFamilies');
  backend.registerCommand('Page.setFontSizes');
  backend.registerCommand('Page.setDocumentContent');
  backend.registerCommand('Page.setDownloadBehavior');
  backend.registerCommand('Page.setGeolocationOverride');
  backend.registerCommand('Page.setLifecycleEventsEnabled');
  backend.registerCommand('Page.setTouchEmulationEnabled');
  backend.registerCommand('Page.startScreencast');
  backend.registerCommand('Page.stopLoading');
  backend.registerCommand('Page.crash');
  backend.registerCommand('Page.close');
  backend.registerCommand('Page.setWebLifecycleState');
  backend.registerCommand('Page.stopScreencast');
  backend.registerCommand('Page.produceCompilationCache');
  backend.registerCommand('Page.addCompilationCache');
  backend.registerCommand('Page.clearCompilationCache');
  backend.registerCommand('Page.setSPCTransactionMode');
  backend.registerCommand('Page.generateTestReport');
  backend.registerCommand('Page.waitForDebugger');
  backend.registerCommand('Page.setInterceptFileChooserDialog');
  backend.registerCommand('Performance.disable');
  backend.registerCommand('Performance.enable');
  backend.registerCommand('Performance.setTimeDomain');
  backend.registerCommand('Performance.getMetrics');
  backend.registerCommand('PerformanceTimeline.enable');
  backend.registerCommand('Security.disable');
  backend.registerCommand('Security.enable');
  backend.registerCommand('Security.setIgnoreCertificateErrors');
  backend.registerCommand('Security.handleCertificateError');
  backend.registerCommand('Security.setOverrideCertificateErrors');
  backend.registerCommand('ServiceWorker.deliverPushMessage');
  backend.registerCommand('ServiceWorker.disable');
  backend.registerCommand('ServiceWorker.dispatchSyncEvent');
  backend.registerCommand('ServiceWorker.dispatchPeriodicSyncEvent');
  backend.registerCommand('ServiceWorker.enable');
  backend.registerCommand('ServiceWorker.inspectWorker');
  backend.registerCommand('ServiceWorker.setForceUpdateOnPageLoad');
  backend.registerCommand('ServiceWorker.skipWaiting');
  backend.registerCommand('ServiceWorker.startWorker');
  backend.registerCommand('ServiceWorker.stopAllWorkers');
  backend.registerCommand('ServiceWorker.stopWorker');
  backend.registerCommand('ServiceWorker.unregister');
  backend.registerCommand('ServiceWorker.updateRegistration');
  backend.registerCommand('Storage.getStorageKeyForFrame');
  backend.registerCommand('Storage.clearDataForOrigin');
  backend.registerCommand('Storage.clearDataForStorageKey');
  backend.registerCommand('Storage.getCookies');
  backend.registerCommand('Storage.setCookies');
  backend.registerCommand('Storage.clearCookies');
  backend.registerCommand('Storage.getUsageAndQuota');
  backend.registerCommand('Storage.overrideQuotaForOrigin');
  backend.registerCommand('Storage.trackCacheStorageForOrigin');
  backend.registerCommand('Storage.trackIndexedDBForOrigin');
  backend.registerCommand('Storage.untrackCacheStorageForOrigin');
  backend.registerCommand('Storage.untrackIndexedDBForOrigin');
  backend.registerCommand('Storage.getTrustTokens');
  backend.registerCommand('Storage.clearTrustTokens');
  backend.registerCommand('Storage.getInterestGroupDetails');
  backend.registerCommand('Storage.setInterestGroupTracking');
  backend.registerCommand('SystemInfo.getInfo');
  backend.registerCommand('SystemInfo.getProcessInfo');
  backend.registerCommand('Target.activateTarget');
  backend.registerCommand('Target.attachToTarget');
  backend.registerCommand('Target.attachToBrowserTarget');
  backend.registerCommand('Target.closeTarget');
  backend.registerCommand('Target.exposeDevToolsProtocol');
  backend.registerCommand('Target.createBrowserContext');
  backend.registerCommand('Target.getBrowserContexts');
  backend.registerCommand('Target.createTarget');
  backend.registerCommand('Target.detachFromTarget');
  backend.registerCommand('Target.disposeBrowserContext');
  backend.registerCommand('Target.getTargetInfo');
  backend.registerCommand('Target.getTargets');
  backend.registerCommand('Target.sendMessageToTarget');
  backend.registerCommand('Target.setAutoAttach');
  backend.registerCommand('Target.autoAttachRelated');
  backend.registerCommand('Target.setDiscoverTargets');
  backend.registerCommand('Target.setRemoteLocations');
  backend.registerCommand('Tethering.bind');
  backend.registerCommand('Tethering.unbind');
  backend.registerCommand('Tracing.end');
  backend.registerCommand('Tracing.getCategories');
  backend.registerCommand('Tracing.recordClockSyncMarker');
  backend.registerCommand('Tracing.requestMemoryDump');
  backend.registerCommand('Tracing.start');
  backend.registerCommand('Fetch.disable');
  backend.registerCommand('Fetch.enable');
  backend.registerCommand('Fetch.failRequest');
  backend.registerCommand('Fetch.fulfillRequest');
  backend.registerCommand('Fetch.continueRequest');
  backend.registerCommand('Fetch.continueWithAuth');
  backend.registerCommand('Fetch.continueResponse');
  backend.registerCommand('Fetch.getResponseBody');
  backend.registerCommand('Fetch.takeResponseBodyAsStream');
  backend.registerCommand('WebAudio.enable');
  backend.registerCommand('WebAudio.disable');
  backend.registerCommand('WebAudio.getRealtimeData');
  backend.registerCommand('WebAuthn.enable');
  backend.registerCommand('WebAuthn.disable');
  backend.registerCommand('WebAuthn.addVirtualAuthenticator');
  backend.registerCommand('WebAuthn.removeVirtualAuthenticator');
  backend.registerCommand('WebAuthn.addCredential');
  backend.registerCommand('WebAuthn.getCredential');
  backend.registerCommand('WebAuthn.getCredentials');
  backend.registerCommand('WebAuthn.removeCredential');
  backend.registerCommand('WebAuthn.clearCredentials');
  backend.registerCommand('WebAuthn.setUserVerified');
  backend.registerCommand('WebAuthn.setAutomaticPresenceSimulation');
  backend.registerCommand('Media.enable');
  backend.registerCommand('Media.disable');
  backend.registerCommand('Console.clearMessages');
  backend.registerCommand('Console.disable');
  backend.registerCommand('Console.enable');
  backend.registerCommand('Debugger.continueToLocation');
  backend.registerCommand('Debugger.disable');
  backend.registerCommand('Debugger.enable');
  backend.registerCommand('Debugger.evaluateOnCallFrame');
  backend.registerCommand('Debugger.getPossibleBreakpoints');
  backend.registerCommand('Debugger.getScriptSource');
  backend.registerCommand('Debugger.disassembleWasmModule');
  backend.registerCommand('Debugger.nextWasmDisassemblyChunk');
  backend.registerCommand('Debugger.getWasmBytecode');
  backend.registerCommand('Debugger.getStackTrace');
  backend.registerCommand('Debugger.pause');
  backend.registerCommand('Debugger.pauseOnAsyncCall');
  backend.registerCommand('Debugger.removeBreakpoint');
  backend.registerCommand('Debugger.restartFrame');
  backend.registerCommand('Debugger.resume');
  backend.registerCommand('Debugger.searchInContent');
  backend.registerCommand('Debugger.setAsyncCallStackDepth');
  backend.registerCommand('Debugger.setBlackboxPatterns');
  backend.registerCommand('Debugger.setBlackboxedRanges');
  backend.registerCommand('Debugger.setBreakpoint');
  backend.registerCommand('Debugger.setInstrumentationBreakpoint');
  backend.registerCommand('Debugger.setBreakpointByUrl');
  backend.registerCommand('Debugger.setBreakpointOnFunctionCall');
  backend.registerCommand('Debugger.setBreakpointsActive');
  backend.registerCommand('Debugger.setPauseOnExceptions');
  backend.registerCommand('Debugger.setReturnValue');
  backend.registerCommand('Debugger.setScriptSource');
  backend.registerCommand('Debugger.setSkipAllPauses');
  backend.registerCommand('Debugger.setVariableValue');
  backend.registerCommand('Debugger.stepInto');
  backend.registerCommand('Debugger.stepOut');
  backend.registerCommand('Debugger.stepOver');
  backend.registerCommand('HeapProfiler.addInspectedHeapObject');
  backend.registerCommand('HeapProfiler.collectGarbage');
  backend.registerCommand('HeapProfiler.disable');
  backend.registerCommand('HeapProfiler.enable');
  backend.registerCommand('HeapProfiler.getHeapObjectId');
  backend.registerCommand('HeapProfiler.getObjectByHeapObjectId');
  backend.registerCommand('HeapProfiler.getSamplingProfile');
  backend.registerCommand('HeapProfiler.startSampling');
  backend.registerCommand('HeapProfiler.startTrackingHeapObjects');
  backend.registerCommand('HeapProfiler.stopSampling');
  backend.registerCommand('HeapProfiler.stopTrackingHeapObjects');
  backend.registerCommand('HeapProfiler.takeHeapSnapshot');
  backend.registerCommand('Profiler.disable');
  backend.registerCommand('Profiler.enable');
  backend.registerCommand('Profiler.getBestEffortCoverage');
  backend.registerCommand('Profiler.setSamplingInterval');
  backend.registerCommand('Profiler.start');
  backend.registerCommand('Profiler.startPreciseCoverage');
  backend.registerCommand('Profiler.startTypeProfile');
  backend.registerCommand('Profiler.stop');
  backend.registerCommand('Profiler.stopPreciseCoverage');
  backend.registerCommand('Profiler.stopTypeProfile');
  backend.registerCommand('Profiler.takePreciseCoverage');
  backend.registerCommand('Profiler.takeTypeProfile');
  backend.registerCommand('Runtime.awaitPromise');
  backend.registerCommand('Runtime.callFunctionOn');
  backend.registerCommand('Runtime.compileScript');
  backend.registerCommand('Runtime.disable');
  backend.registerCommand('Runtime.discardConsoleEntries');
  backend.registerCommand('Runtime.enable');
  backend.registerCommand('Runtime.evaluate');
  backend.registerCommand('Runtime.getIsolateId');
  backend.registerCommand('Runtime.getHeapUsage');
  backend.registerCommand('Runtime.getProperties');
  backend.registerCommand('Runtime.globalLexicalScopeNames');
  backend.registerCommand('Runtime.queryObjects');
  backend.registerCommand('Runtime.releaseObject');
  backend.registerCommand('Runtime.releaseObjectGroup');
  backend.registerCommand('Runtime.runIfWaitingForDebugger');
  backend.registerCommand('Runtime.runScript');
  backend.registerCommand('Runtime.setAsyncCallStackDepth');
  backend.registerCommand('Runtime.setCustomObjectFormatterEnabled');
  backend.registerCommand('Runtime.setMaxCallStackSizeToCapture');
  backend.registerCommand('Runtime.terminateExecution');
  backend.registerCommand('Runtime.addBinding');
  backend.registerCommand('Runtime.removeBinding');
  backend.registerCommand('Runtime.getExceptionDetails');
  backend.registerCommand('Schema.getDomains');
}

export function registerServices(serviceManager: IServiceManager, backend: {getDomain: (domainName: string) => any}) {
  serviceManager.registerServiceBean(IAccessibility, backend.getDomain('Accessibility'));
  serviceManager.registerServiceBean(IAnimation, backend.getDomain('Animation'));
  serviceManager.registerServiceBean(IAudits, backend.getDomain('Audits'));
  serviceManager.registerServiceBean(IBackgroundService, backend.getDomain('BackgroundService'));
  serviceManager.registerServiceBean(IBrowser, backend.getDomain('Browser'));
  serviceManager.registerServiceBean(ICSS, backend.getDomain('CSS'));
  serviceManager.registerServiceBean(ICacheStorage, backend.getDomain('CacheStorage'));
  serviceManager.registerServiceBean(ICast, backend.getDomain('Cast'));
  serviceManager.registerServiceBean(IDOM, backend.getDomain('DOM'));
  serviceManager.registerServiceBean(IDOMDebugger, backend.getDomain('DOMDebugger'));
  serviceManager.registerServiceBean(IEventBreakpoints, backend.getDomain('EventBreakpoints'));
  serviceManager.registerServiceBean(IDOMSnapshot, backend.getDomain('DOMSnapshot'));
  serviceManager.registerServiceBean(IDOMStorage, backend.getDomain('DOMStorage'));
  serviceManager.registerServiceBean(IDatabase, backend.getDomain('Database'));
  serviceManager.registerServiceBean(IDeviceOrientation, backend.getDomain('DeviceOrientation'));
  serviceManager.registerServiceBean(IEmulation, backend.getDomain('Emulation'));
  serviceManager.registerServiceBean(IHeadlessExperimental, backend.getDomain('HeadlessExperimental'));
  serviceManager.registerServiceBean(IIO, backend.getDomain('IO'));
  serviceManager.registerServiceBean(IIndexedDB, backend.getDomain('IndexedDB'));
  serviceManager.registerServiceBean(IInput, backend.getDomain('Input'));
  serviceManager.registerServiceBean(IInspector, backend.getDomain('Inspector'));
  serviceManager.registerServiceBean(ILayerTree, backend.getDomain('LayerTree'));
  serviceManager.registerServiceBean(ILog, backend.getDomain('Log'));
  serviceManager.registerServiceBean(IMemory, backend.getDomain('Memory'));
  serviceManager.registerServiceBean(INetwork, backend.getDomain('Network'));
  serviceManager.registerServiceBean(IOverlay, backend.getDomain('Overlay'));
  serviceManager.registerServiceBean(IPage, backend.getDomain('Page'));
  serviceManager.registerServiceBean(IPerformance, backend.getDomain('Performance'));
  serviceManager.registerServiceBean(IPerformanceTimeline, backend.getDomain('PerformanceTimeline'));
  serviceManager.registerServiceBean(ISecurity, backend.getDomain('Security'));
  serviceManager.registerServiceBean(IServiceWorker, backend.getDomain('ServiceWorker'));
  serviceManager.registerServiceBean(IStorage, backend.getDomain('Storage'));
  serviceManager.registerServiceBean(ISystemInfo, backend.getDomain('SystemInfo'));
  serviceManager.registerServiceBean(ITarget, backend.getDomain('Target'));
  serviceManager.registerServiceBean(ITethering, backend.getDomain('Tethering'));
  serviceManager.registerServiceBean(ITracing, backend.getDomain('Tracing'));
  serviceManager.registerServiceBean(IFetch, backend.getDomain('Fetch'));
  serviceManager.registerServiceBean(IWebAudio, backend.getDomain('WebAudio'));
  serviceManager.registerServiceBean(IWebAuthn, backend.getDomain('WebAuthn'));
  serviceManager.registerServiceBean(IMedia, backend.getDomain('Media'));
  serviceManager.registerServiceBean(IConsole, backend.getDomain('Console'));
  serviceManager.registerServiceBean(IDebugger, backend.getDomain('Debugger'));
  serviceManager.registerServiceBean(IHeapProfiler, backend.getDomain('HeapProfiler'));
  serviceManager.registerServiceBean(IProfiler, backend.getDomain('Profiler'));
  serviceManager.registerServiceBean(IRuntime, backend.getDomain('Runtime'));
  serviceManager.registerServiceBean(ISchema, backend.getDomain('Schema'));
}
