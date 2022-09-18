/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package wicket.in.action.common;

import java.io.Serializable;

import org.apache.wicket.Component;
import org.apache.wicket.MarkupContainer;
import org.apache.wicket.RequestCycle;
import org.apache.wicket.ajax.AbstractDefaultAjaxBehavior;
import org.apache.wicket.ajax.AjaxEventBehavior;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.markup.ComponentTag;
import org.apache.wicket.markup.MarkupStream;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.FormComponent;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.util.convert.IConverter;
import org.apache.wicket.util.string.JavascriptUtils;
import org.apache.wicket.validation.IValidator;

public class AjaxEditableLabel extends Panel {

  private FormComponent editor;

  private Component label;

  protected class EditorAjaxBehavior extends
      AbstractDefaultAjaxBehavior {

    @Override
    protected void onComponentTag(ComponentTag tag) {
      super.onComponentTag(tag);

      final String saveCall = "{"
          + generateCallbackScript("wicketAjaxGet('"
              + getCallbackUrl()
              + "&save=true&'+this.name+'='+wicketEncode(this.value)")
          + "; return false;}";

      final String cancelCall = "{"
          + generateCallbackScript("wicketAjaxGet('"
              + getCallbackUrl() + "&save=false'")
          + "; return false;}";

      final String keypress = "var kc=wicketKeyCode(event); if (kc==27) "
          + cancelCall
          + " else if (kc!=13) { return true; } else "
          + saveCall;

      tag.put("onblur", saveCall);
      tag.put("onkeypress", keypress);
    }

    @Override
    protected void respond(AjaxRequestTarget target) {
      RequestCycle requestCycle = RequestCycle.get();
      boolean save = Boolean.valueOf(
          requestCycle.getRequest().getParameter("save"))
          .booleanValue();

      if (save) {
        editor.processInput();

        if (editor.isValid()) {
          onSubmit(target);
        } else {
          onError(target);
        }
      } else {
        onCancel(target);
      }
    }
  }

  protected class LabelAjaxBehavior extends AjaxEventBehavior {
    public LabelAjaxBehavior(String event) {
      super(event);
    }

    @Override
    protected void onEvent(AjaxRequestTarget target) {
      onEdit(target);
    }
  }

  public AjaxEditableLabel(String id) {
    super(id);
    setOutputMarkupId(true);
  }

  public AjaxEditableLabel(String id, IModel model) {
    super(id, model);
    setOutputMarkupId(true);
  }

  public final AjaxEditableLabel add(IValidator validator) {
    getEditor().add(validator);
    return this;
  }

  @Override
  public IConverter getConverter(Class type) {
    return null;
  }

  public final AjaxEditableLabel setLabel(final IModel labelModel) {
    getEditor().setLabel(labelModel);
    return this;
  }

  @Override
  public final Component setModel(IModel model) {
    super.setModel(model);
    getLabel().setModel(model);
    getEditor().setModel(model);
    return this;
  }

  public final AjaxEditableLabel setRequired(final boolean required) {
    getEditor().setRequired(required);
    return this;
  }

  public final AjaxEditableLabel setType(Class type) {
    getEditor().setType(type);
    return this;
  }

  protected FormComponent newEditor(MarkupContainer parent,
      String componentId, IModel model) {

    TextField editor = new TextField(componentId, model) {

      @Override
      public IConverter getConverter(Class type) {
        IConverter c = AjaxEditableLabel.this.getConverter(type);
        return c != null ? c : super.getConverter(type);
      }
    };
    editor.setOutputMarkupId(true);
    editor.setVisible(false);
    editor.add(new EditorAjaxBehavior());
    return editor;
  }

  protected Component newLabel(MarkupContainer parent,
      String componentId, IModel model) {

    Label label = new Label(componentId, model) {

      @Override
      public IConverter getConverter(Class type) {
        IConverter c = AjaxEditableLabel.this.getConverter(type);
        return c != null ? c : super.getConverter(type);
      }

      @Override
      protected void onComponentTagBody(MarkupStream markupStream,
          ComponentTag openTag) {
        Object modelObject = getModelObject();
        if (modelObject == null || "".equals(modelObject)) {
          replaceComponentTagBody(markupStream, openTag,
              defaultNullLabel());
        } else {
          super.onComponentTagBody(markupStream, openTag);
        }
      }
    };
    label.setOutputMarkupId(true);
    label.add(new LabelAjaxBehavior("onclick"));
    return label;
  }

  protected final FormComponent getEditor() {
    if (editor == null) {
      initLabelAndEditor(getParentModel());
    }
    return editor;
  }

  protected final Component getLabel() {
    if (label == null) {
      initLabelAndEditor(getParentModel());
    }
    return label;
  }

  @Override
  protected void onBeforeRender() {
    super.onBeforeRender();
    if (editor == null) {
      initLabelAndEditor(getParentModel());
    }
    label.setEnabled(isEnableAllowed() && isEnabled());
  }

  protected void onCancel(AjaxRequestTarget target) {
    label.setVisible(true);
    editor.setVisible(false);
    target.addComponent(AjaxEditableLabel.this);
  }

  protected void onEdit(AjaxRequestTarget target) {
    label.setVisible(false);
    editor.setVisible(true);
    target.addComponent(AjaxEditableLabel.this);
    target.appendJavascript("{ var el=wicketGet('"
        + editor.getMarkupId() + "');"
        + "   if (el.createTextRange) { "
        + "     var v = el.value; var r = el.createTextRange(); "
        + "     r.moveStart('character', v.length); r.select(); } }");
    target.focusComponent(editor);
  }

  protected void onError(AjaxRequestTarget target) {
    Serializable errorMessage = editor.getFeedbackMessage()
        .getMessage();
    if (errorMessage instanceof String) {
      target.appendJavascript("window.status='"
          + JavascriptUtils.escapeQuotes((String) errorMessage)
          + "';");
    }
    String editorMarkupId = editor.getMarkupId();
    target.appendJavascript(editorMarkupId + ".select();");
    target.appendJavascript(editorMarkupId + ".focus();");
    target.addComponent(editor);
  }

  protected void onSubmit(AjaxRequestTarget target) {
    label.setVisible(true);
    editor.setVisible(false);
    target.addComponent(AjaxEditableLabel.this);

    target.appendJavascript("window.status='';");
  }

  private void initLabelAndEditor(IModel model) {
    editor = newEditor(this, "editor", model);
    label = newLabel(this, "label", model);
    add(label);
    add(editor);
  }

  private IModel getParentModel() {
    IModel m = getModel();
    if (m == null) {
      Component parent = getParent();
      String msg = "No model found for this component, either pass one explicitly or "
          + "make sure an inheritable model is available.";
      if (parent == null) {
        msg += " This component is not added to a parent yet, so if this component "
            + "is supposed to use the model of the parent (e.g. when it uses a "
            + "compound property model), add it first before further configuring "
            + "the component calling methods like e.g. setType and addValidator.";
      }
      throw new IllegalStateException(msg);
    }
    return m;
  }

  protected String defaultNullLabel() {
    return "...";
  }
}
