Wicket in Action
================

This project is the companion examples project to the Wicket in Action
book. The code is licensed under the Apache Software License 2.0 and
available from Google code hosting.

In this document you will find the following information:

 - About the book 
 - About the examples 
 - Downloading the examples 
 - Running the examples
 - Building from source

About the book
--------------

There are dozens of Java frameworks out there, but most of them require
you to learn special coding techniques and new, often rigid, patterns of
development. Wicket is different. As a component-based web application
framework, Wicket lets you build maintainable enterprise-grade web
applications using the power of plain old Java objects (POJOs), HTML,
Ajax, Spring, Hibernate, and Maven. Wicket automatically manages state
at the component level, which means no more awkward HTTPSession objects.
Its elegant programming model enables you to write rich web applications
quickly.

Wicket in Action is an authoritative, comprehensive guide for Java
developers building Wicket-based web applications. This book starts with
an introduction to Wicket's structure and components, and moves quickly
into examples of Wicket at work. Written by two of the project's
earliest and most authoritative experts, this book shows you both the
“how-to” and the “why” of Wicket. As you move through the book, you'll
learn to use and customize Wicket components, how to interact with other
technologies like Spring and Hibernate, and how to build rich,
Ajax-driven features into your applications.

About the examples
------------------

These examples have been created with two ideas in mind:

1. the examples have to look good 
2. the examples need to be understandable

In order to satisfy both these ideas we have used Wicket's markup
inheritance to create a consistent layout, as is explained in chapter 7
of our book.

This boils down to the situation where we define our layout for all
pages in our examples in a base page, called `AbstractBasePage`. This
page defines the layout, and adds a basic menu to each page, linking to
the main content of these examples. Each example page extends the
`AbstractBasePage` and provides the components for the examples of the
particular section. The markup of each example page is wrapped inside
`<wicket:extend>` tags.

So if you want to see the examples' code in isolation, please take a
look at the actual source code, instead of what is rendered inside your
browser.

Downloading the examples
------------------------

You can download the latest examples from the Wicket in Action google
code project, found at:

[http://wicketinaction.googlecode.com](http://wicketinaction.googlecode.com)

Running the examples
--------------------

The examples require the following prerequisites in order to run: 

 - Java 5 or newer 
 - a servlet container supporting Servlet api 2.4 or newer (Tomcat 5+,
   Jetty 5+, etc.)

The examples can be run by deploying the _wicket-in-action.war_ into the
servlet container of your choice. Usually by copying it into the webapps
directory. The WAR archive is a separate download available from the
project web site, or you can build and run it from the source
distribution.

**Using Apache Ant**

If you have [Apache Ant](http://ant.apache.org) installed, you can build
and run the examples by doing:

    ant run

in the root of the distribution. This will compile, test and run the
examples.

**Using Apache Maven**

If you have [Apache Maven](http://maven.apache.org) installed, you can
build and run the examples by doing:

    mvn jetty:run

This has been tested with Apache Maven 2.0.9. It may work on older
versions, but we advise using the 2.0.9 release.

Building from source
--------------------

There are two options for you to build the examples from source:

1. directly from SVN
2. from the distribution

**Building from SVN**

When you checkout the sources from our SVN repository, you **need**
Apache Maven installed. If you don't like Maven, then you should
download the distribution instead as it contains a functional Ant build.

Checking out the source code is done using the following subversion command:

    svn co http://wicketinaction.googlecode.com/svn/trunk/book-wicket-in-action wia

This will check out the project to the subdirectory 'wia'. Go inside
that directory and issue the following Maven command:

    mvn package

This will compile, test and package the project, resulting in the WAR
archive in the 'target' subdirectory. Running the examples can be done
instantly with the Jetty maven plugin:

    mvn jetty:run

Start up your browser and go to: [http://localhost:8080](http://localhost:8080)

**Building from the distribution**

After you have downloaded the distribution, you can use either Ant or Maven to build the examples.

    ant war

or

    mvn package

Running the examples is also easy:

    ant run

or

    mvn jetty:run

Have fun!
